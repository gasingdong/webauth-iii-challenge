import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

export default server;
