import client from "./db.mjs";
import { ObjectId } from "mongodb";


const db = client.db("BuildathonAPP");

async function create(phoneNum){
    try{
        console.log("Creating user with phone number: ", phoneNum);
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

export default {create};
