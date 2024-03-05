"use strict";

import express from "express";
import dotenv from "dotenv";
import session from "express-session"; 
import mongoStore from "connect-mongo";
import cors from "cors";


import { initDB, getClient } from "./models/db.mjs";; 
import userRouter from "./routes/user.mjs";
import apiRouter from "./routes/api.mjs";

dotenv.config();

const app = express(); //Creation of app


export let server; 

initDB().then(()=>{
    console.log("Connected to database");
    const store = mongoStore.create({
        client: getClient(),
        collectionName: "sessions",
        dbName: "BuildathonAPP" ,
        touchAfter: 24 * 3600

    });
    store.on("error", function(e){
        console.log(e);
    });

    const secret = "secret";
    var sess = { 
        secret: secret,
        store: store,
        resave: false,
        saveUninitialized: true,
        cookie: {  }
    }

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
      }

    app.use(express.json());
    app.use(session(sess));
    app.use('/api/users', userRouter);
    app.use('/api',  apiRouter)
    app.use(express.static('public'));
    
    const port = 3000;

    server = app.listen(port); 

    server.on('listening', () => {
        console.info(`Server is running on port ${port}`);
    });
    server.on('error', (err) => {
        console.error('Error starting server:', err);
    });

    function onListening(){
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }
    
    })



 

export default app;