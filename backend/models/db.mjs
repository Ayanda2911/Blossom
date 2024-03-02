"use strict";

import { MongoClient} from "mongodb";
import  dotenv  from "dotenv";

dotenv.config();

const uri = `mongodb+srv://mcanyanaayanda:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.2jw9wmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
let _client; 

export async function initDB(){
    if (_client){
        return _client;
    }

    _client = new MongoClient(uri); 

    await _client.connect();
    
}

export async function closeDB(){
    if (!_client){
        throw new Error('Client has not been initialized');
    }

    return _client.close();
}

export function getClient(){
    if (!_client){
        throw new Error('Client has not been initialized');
    }

    return _client;
}

export async function getDB(){
    if (!_client){
        throw new Error('Client has not been initialized');
    }

    return _client.db("BuildathonAPP");
}
