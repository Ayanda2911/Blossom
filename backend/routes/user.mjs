"use strict";
import express from "express"; 
import { getUser } from  "../models/user.mjs";

const router = express.Router();

router.get("/:phoneNum", async (req, res) => {
    const phoneNum = req.params.phoneNum;
    const user = await getUser(phoneNum);
    res.json(user);
    return ; 
}); 

// maybe change password for phoneNum 
// change emergency contact for phone num 
// add emergencey contacts for phone num
// get emergency contacts for phone num
function isSignedIn(req){
    return req.session.user !== undefined; 
}

export default router;