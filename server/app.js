import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { setupDb } from './db/setupDb.js';
import usersRouter from './routes/users.js';

const app = express();

setupDb();

app.use(function (req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Version, Authorization, Content-Type',
        "Content-Type": 'application/json; charset=UTF-8'
    });
    next();
});

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", usersRouter);

export {app};
