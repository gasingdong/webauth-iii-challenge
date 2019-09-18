import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Users from '../users/user-model';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api/users', async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(err);
  }
  console.log(err);
  res.status(500).json({ error: 'Unexpected server error.' });
};

server.use(errorHandler);

export default server;
