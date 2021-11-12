
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';


var initApp = function () {
    var app = express();
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    console.log("version:", process.env.NODE_ENV);
    return app;
};
export default initApp;