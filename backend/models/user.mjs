import {getDB, initDB} from "./db.mjs";



export async function createUser(phoneNum){
    try{
        console.log("Creating user with phone number: ", phoneNum);
        const db = await getDB();
        let user = await db.collection("users").findOne({phonenumber: phoneNum});
        if(user){
            return "User already exists";
        }
        user = {phonenumber: phoneNum};
        const result = await db.collection("users").insertOne(user);
        return result;
    }
    catch(e){
        console.error(e);
    }
}

export async function getUser(phoneNum){
    try{
        console.log("Getting user with phone number: ", phoneNum);
        const db = await getDB();
        const user = await db.collection("users").findOne({phonenumber: phoneNum});
        return user;
    }
    catch(e){
        console.error(e);
    }
}



