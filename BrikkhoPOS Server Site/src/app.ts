import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: ' BikkhoPOS Server..',
        RunningTime: process.uptime().toFixed(2) + ' seconds',
        Time: new Date().toLocaleTimeString(),
    });
});

export default app;
