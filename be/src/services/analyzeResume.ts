import { Request, Response, NextFunction, RequestHandler } from 'express';
import OpenAI from 'openai';
import { serverError, getEnv } from '../util';
import { Success } from '../types';

const client = new OpenAI({ apiKey: getEnv('OPENAI_KEY') });

/**
 *  analyzeResume handles calling openAI Util functions to handle analyzing file
 *
 * @param parsedMarkdown parsed DOCX/PDF as HTML
 * @returns
 */
export const analyzeResume = async (
  parsedMarkdown: string
): Promise<Success> => {
  try {
    const threadId: string = await createThread(parsedMarkdown);
    const runId: string = await runThread(threadId);
    const success = await checkRunStatus(threadId, runId);
    return success;
  } catch (error) {
    console.error('Error in analyzeResume:', error);
    throw new Error('There was an issue analyzing your resume');
  }
};

/**
 *  checkRunStatus handles checking whether our pending prompt has failed or succeded
 *
 * @param threadId ID for GPT conversation thread
 * @param runId ID for currently running GPT conversation thread
 * @param res Express Response
 * @returns
 */
const checkRunStatus = async (
  threadId: string,
  runId: string
): Promise<Success> => {
  let success: Success = { success: false, message: '' };
  try {
    let run: OpenAI.Beta.Threads.Runs.Run;

    do {
      run = await client.beta.threads.runs.retrieve(threadId, runId);

      if (run.status === 'failed' || run.status === 'incomplete') {
        console.error('Error in thread run:' + run);
        success.message = 'Error in thread run';
        return success;
      }

      await new Promise((res) => setTimeout(res, 2000));
    } while (run.status !== 'completed');

    // Retrieve the assistant's response
    const messages = await client.beta.threads.messages.list(threadId);

    if (!messages.data.length) {
      console.error('No response from OpenAI' + run);
      success.message = 'No response from OpenAI';
      return success;
    }

    console.log('Assistant Response:', messages.data[0].content);
    success = {
      success: true,
      message: 'Successful analyzation',
      data: messages.data[0].content,
    };

    return success;
  } catch (error) {
    console.error('Error in checkRunStatus:', error);
    success.message = 'Error in checkRunStatus service';
    return success;
  }
};

/**
 *  runThread handles running a GPT thread
 *
 * @param threadId ID for GPT conversation thread
 * @returns
 */
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

/**
 * createThread handles creating a GPT conversation thread
 *
 * @param parsedMarkdown file content as markdown to send to GPT
 * @returns
 */
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
