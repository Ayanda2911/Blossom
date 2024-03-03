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
        res.status(400);
        res.json({
            "message": "must be signed in order to logout "
        });
        return;
    }

    req.session.destroy();
    res.json({
        "message": "Goodbye!"
    });
});

//register handler
router.post("/register", async (req, res) => {
    if (isSignedIn(req)) {
        res.status(400);
        res.json({
            "message": "Already signed in"
        });
        return;
    }
    // check that the request has a username and password
    const keys = ["phoneNum", "password"]
    if (!keys.every((e) => req.body.hasOwnProperty(e))) {
        // Error this is a malformed registration request
        res.status(400);
        res.json({
            "message": "Invalid Username or password"
        })
        return;
    }
    // CHECK THAT PHONENUMBER DOES NOT EXIST
    const exists  = await getUser(req.body.phoneNum);
    if (exists) {
        res.status(400);
        res.json({
            "message": "User with this phone number already exists ",
            "Phone Number": req.body.phoneNum
        });
        return;
    }
    // create the user
    const user = await createUser(req.body.phoneNum, req.body.password);

    // store username and _id as part of session
    req.session.username = user.phoneNum;
    req.session._id = user._id;

    // send back a confirmation message
    res.json({
        "message": "Registration successful",
        "username": user.phoneNum
    });
});
export default router;

