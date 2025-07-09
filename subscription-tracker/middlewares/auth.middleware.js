//What this middleware is doing
// its trying to find the user based on the token of the user that is trying to request it lookes if its there, it decoed it, it verifies it (that is the user that is currently logged in), then it attaches it to the requests, later on when we are doing something we can know who exactly is making that request because now we have this additional info

//in simple words
// someone is making a request get user details -> authorize middle - verify -> if valid -> next -> get user details

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";
import User from '../models/user.model.js';

const authorize = async(req, res, next) =>{
    try{
        let token;

        //When you pass a token through the req headers, it starts with Bearer its just an protocol
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; //split the word Bearer and send the sexon part of the token which is the actual token
        }

        if(!token) return res.status(401).json({ message: "Unauthorized"});

        const decoded = jwt.verify(token, JWT_SECRET);
        //decoding the token
        console.log(decoded); 
        // {
        //     userId: '686d3e0b1465bc92c85330f6',
        //     iat: 1752041448,
        //     exp: 1752127848
        //   }

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;

        next();

    }catch(error){
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
}

export default authorize;