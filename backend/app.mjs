"use strict";

import express from "express";
import dotenv from "dotenv";


import { initDB, getClient } from "./models/db.mjs";; 
import userRouter from "./routes/user.mjs";

dotenv.config();

const app = express();

export let server; 

initDB()

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
 
app.use(express.json());
app.use('/users', userRouter);
export default app;