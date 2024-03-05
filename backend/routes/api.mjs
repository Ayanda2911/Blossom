"use strict";
import express from "express";
import { getUser, validateUser, createUser } from  "../models/user.mjs";

const router = express.Router();

// TODO add any endpoints or middleware functions here
function isSignedIn(req) {
    return req.session._id !== undefined
}

router.post("/login", async (req, res) => {
    if(isSignedIn(req)){
        res.status(400);
        res.json({
            "message": "Already signed in"
        });
        return;
    }
    const keys = ["phoneNum", "password"];
    if (!keys.every((e) => req.body.hasOwnProperty(e))) {
        res.status(400);
        res.json({
            "message": "Invalid Username or password"
        })
        return;
    }

    const valid = await validateUser(req.body.phoneNum, req.body.password);
    if (!valid) {
        res.status(400);
        res.json({
            "message": "User not valid"
        })
        return;
    }

    // store session username and 
    req.session.username = req.body.phoneNum; 
    req.session._id = valid._id
    res.json({
        "message": "Welcome to ##",
        "username": req.body.phoneNum
    });
});

router.get("/logout", (req, res) => {

    if (!isSignedIn(req)) {
        return res.status(403).json({
            message: "You must be signed in to log out"
        });
    }
    
    try {
        req.session.destroy((error) => {
            if (error) {
                console.error("Error destroying session:", error);
                return res.status(500).json({
                    message: "Failed to log out"
                });
            }
            return res.json({
                message: "Goodbye!"
            });
        });
    } catch (error) {
        console.error("Error destroying session:", error);
        return res.status(500).json({
            message: "Failed to log out"
        });
    }
});

//register handler
router.post("/register", async (req, res) => {
    try {
        if (isSignedIn(req)) {
            return res.status(400).json({ message: "Already signed in" });
        }

        const requiredFields = ["phoneNum", "username"];
        if (!requiredFields.every(field => req.body.hasOwnProperty(field))) {
            return res.status(400).json({ message: "Invalid phone number or username" });
        }

        const existingUser = await getUser(req.body.phoneNum);
        if (existingUser) {
            return res.status(400).json({ message: "User with this phone number already exists", phoneNum: req.body.phoneNum });
        }

        const newUser = await createUser(req.body.phoneNum, req.body.username);

        req.session.username = newUser.phoneNum;
        req.session._id = newUser._id;

        return res.status(200).json({ message: "Registration successful", username: newUser.phoneNum });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

 // check if user is signed in
router.get("/isSignedIn", (req, res) => {
    if (isSignedIn(req)) {
        res.json({
            "message": "User is signed in",
            "username": req.session.username
        });
    } else {
        res.json({
            "message": "User is not signed in"
        });
    }
    }); 
export default router;