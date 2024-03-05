"use strict";
import express from "express"; 
import { getUser } from  "../models/user.mjs";

const router = express.Router();

router.get("/:phoneNum", async (req, res) => {
    try {
        const phoneNum = req.params.phoneNum;
        const user = await getUser(phoneNum);
        
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// maybe change password for phoneNum 
// change emergency contact for phone num 
// add emergencey contacts for phone num
// get emergency contacts for phone num
function isSignedIn(req){
    return req.session.user !== undefined; 
}

export default router;