import express, { Request, Response } from 'express';
import router from './routes/routes';

const app: express.Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from ts');
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running from port: ${port}`);
});
