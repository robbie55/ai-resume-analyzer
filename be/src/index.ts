import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import router from './routes/routes';
import { handleError } from './middlewares/handleError';
import connectDB from './config/db';

// include custom paredMarkdown attribute
declare global {
  namespace Express {
    interface Request {
      parsedMarkdown: string;
      user: string;
    }
  }
}

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const app: express.Application = express();
app.use(cors(corsOptions));
const port: number = 8080;

connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use(router);

app.use(handleError);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
