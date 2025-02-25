import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import { handleError } from './middlewares/handleError';
import connectDB from './config/db';

// include custom paredMarkdown attribute
declare global {
  namespace Express {
    interface Request {
      parsedMarkdown: string;
    }
  }
}

const app: express.Application = express();
const port: number = 3000;

connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Hello World
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from ts');
});

// Use routes
app.use(router);

app.use(handleError);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
