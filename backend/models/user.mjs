import {getDB, initDB} from "./db.mjs";
import argon2 from "argon2";
import sanitize from "mongo-sanitize"; 

const argon_config = {
    type: argon2.argon2id,
    memoryCost: 15360
};



export async function createUser(phoneNum, username){
    try{
        const db = await getDB();
        const col = db.collection("users");
        
        const userData = {
            phonenumber: sanitize(phoneNum),
            password: await argon2.hash(phoneNum, argon_config), 
            username: sanitize(username)
        }
        const result = await col.insertOne(userData);
        return {
            ...userData, 
            _id: result.insertedId
        }
        
    }
    catch(e){
        console.error(e);
    }
}

export async function validateUser(phoneNum, password){
    try{
        const db = await getDB();
        const col = db.collection("users");
        const user = await col.findOne({
            phonenumber: sanitize(phoneNum)
        });

        if (user){
            const valid = await argon2.verify(user.password, password);
            return valid;
        }
        return false;
    }
    catch(e){
        console.error(e);
    }
}

export async function getUser(phoneNum){
    try{
        console.log("Getting user with phone number: ", phoneNum);
        const db = await getDB();
        const coll = db.collection("users");
        const user = coll.findOne({
            phonenumber: sanitize(phoneNum)
        }, 
        {
            projection: {
                password: 0
            }
        }
        );
        return user;
    }
    catch(e){
        console.error(e);
    }
}



