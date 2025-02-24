import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import OpenAI from 'openai';
import { serverError } from '../util/serverCodes';

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const analyzeResume: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { parsedMarkdown } = req;
  const threadId: string = await createThread(parsedMarkdown);
  const runId: string = await runThread(threadId);
  await checkRunStatus(threadId, runId, res);
};

const checkRunStatus = async (
  threadId: string,
  runId: string,
  res: Response
): Promise<void> => {
  let run: OpenAI.Beta.Threads.Runs.Run;
  do {
    run = await client.beta.threads.runs.retrieve(threadId, runId);
    if (run.status == 'failed' || run.status == 'incomplete') {
      console.log(run);
      return serverError(400, `OpenAI thread failed`, res);
    }
    console.log('Run Status: ', run.status);
    await new Promise((res) => setTimeout(res, 2000));
  } while (run.status != 'completed');

  // Retrieve the assistant's response
  const messages = await client.beta.threads.messages.list(threadId);
  console.log('Assistant Response:', messages.data[0].content);
};

const runThread = async (threadId: string): Promise<string> => {
  if (!process.env.ASST_ID) {
    throw new Error('Missing ASST_ID in environment variables');
  }

  const run: OpenAI.Beta.Threads.Runs.Run =
    await client.beta.threads.runs.create(threadId, {
      assistant_id: process.env.ASST_ID,
      max_completion_tokens: 1000,
    });

  return run.id;
};

const createThread: Function = async (
  parsedMarkdown: string
): Promise<string> => {
  // create a thread for assistant
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
};
