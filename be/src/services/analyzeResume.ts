import { Request, Response, NextFunction, RequestHandler } from 'express';
import OpenAI from 'openai';
import { serverError, getEnv } from '../util';

const client = new OpenAI({ apiKey: getEnv('OPENAI_KEY') });

export const analyzeResume: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { parsedMarkdown } = req;

    if (!parsedMarkdown) {
      return serverError(400, 'No resume content provided', res);
    }

    const threadId: string = await createThread(parsedMarkdown);
    const runId: string = await runThread(threadId);
    await checkRunStatus(threadId, runId, res);
  } catch (error) {
    console.error('Error in analyzeResume:', error);
    next(error);
  }
};

const checkRunStatus = async (
  threadId: string,
  runId: string,
  res: Response
): Promise<void> => {
  try {
    let run: OpenAI.Beta.Threads.Runs.Run;

    do {
      run = await client.beta.threads.runs.retrieve(threadId, runId);

      if (run.status === 'failed' || run.status === 'incomplete') {
        console.log(run);
        return serverError(400, `OpenAI thread failed`, res);
      }

      console.log('Run Status: ', run.status);
      await new Promise((res) => setTimeout(res, 2000));
    } while (run.status !== 'completed');

    // Retrieve the assistant's response
    const messages = await client.beta.threads.messages.list(threadId);

    if (!messages.data.length) {
      return serverError(500, 'No response from OpenAI', res);
    }

    console.log('Assistant Response:', messages.data[0].content);
    res.json({ response: messages.data[0].content });
  } catch (error) {
    console.error('Error in checkRunStatus:', error);
    serverError(500, 'Error processing OpenAI request', res);
  }
};

const runThread = async (threadId: string): Promise<string> => {
  try {
    const run: OpenAI.Beta.Threads.Runs.Run =
      await client.beta.threads.runs.create(threadId, {
        assistant_id: getEnv('ASST_ID'),
        max_completion_tokens: 1000,
      });

    return run.id;
  } catch (error) {
    console.error('Error in runThread:', error);
    throw new Error('Failed to run OpenAI thread'); // Propagates error to caller
  }
};

const createThread = async (parsedMarkdown: string): Promise<string> => {
  try {
    const thread: OpenAI.Beta.Thread = await client.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: `Please review the following resume and provide constructive feedback. 

                    Focus on:
                    - Clarity, formatting, and relevance to common industry standards.
                    - Strengths and weaknesses in structure, wording, and overall presentation.
                    - Alignment with professional expectations.
                    - Suggested improvements to enhance its impact.

                    Provide feedback in JSON using the following output format:
                    {
                      "strengths": ["..."],
                      "weaknesses": ["..."],
                      "recommendations": ["..."]
                    }

                    Here is the extracted resume content:
                    \`\`\`markdown
                    ${parsedMarkdown}
                    \`\`\`
                    `,
        },
      ],
    });

    return thread.id;
  } catch (error) {
    console.error('Error in createThread:', error);
    throw new Error('Failed to create OpenAI thread');
  }
};
