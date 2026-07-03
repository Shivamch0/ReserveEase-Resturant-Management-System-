import express, { urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin : process.env.CORS,
    credentials : true
}));
app.use(cookieParser());

app.use(express.json({limit : '16kb'}));
app.use(urlencoded());

import userRouter from './routes/user.route.js';
import tableRoute from './routes/table.route.js';
import reservationRouter from './routes/reservation.route.js'
import errorHandler from './middleware/error.middleware.js';

app.use('/api/v1/users' , userRouter);
app.use('/api/v1/tables' , tableRoute);
app.use('/api/v1/reservations' , reservationRouter);


app.use(errorHandler)

export default app;