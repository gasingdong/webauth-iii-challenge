import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import Users from '../users/user-model';
import Restricted from './restricted-middleware';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;

  if (!body) {
    res.status(400).json({ error: 'No body provided.' });
    return;
  }

  const { username, password, department } = body;

  if (username && password && department) {
    try {
      const existingUser = await Users.findBy({ username });

      if (!existingUser) {
        next();
      } else {
        res.status(400).json({ error: 'Username is already taken.' });
      }
    } catch (err) {
      next(err);
    }
  } else {
    res
      .status(400)
      .json({ error: 'Users need a username, password, and deparment.' });
  }
};

server.get('/api/users', Restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

server.post('/api/register', validateUser, async (req, res, next) => {
  const user = req.body;
  const hash = bcryptjs.hashSync(user.password);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    res.status(201).json(saved);
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
