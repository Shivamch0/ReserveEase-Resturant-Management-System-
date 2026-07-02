import express, { urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json({limit : '16kb'}));
app.use(urlencoded());

import userRouter from './routes/user.route.js'

app.use('/api/v1/user' , userRouter);

export default app;