import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';

// include custom paredMarkdown attribute
declare global {
  namespace Express {
    interface Request {
      parsedMarkdown?: string;
    }
  }
}

const app: express.Application = express();
const port: number = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from ts');
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running from port: ${port}`);
});
