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

export default router;