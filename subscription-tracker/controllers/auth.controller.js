//routes handle the end points while the controller handles the logic of the end points
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// What is a req body? -> req.body is an object containing data from the client (POST request)
export const signUp = async (req, res, next) => {
  //Implement sign up logic here
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    //Check if a user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //add the {session} if anything goes wrong it will not create a new user
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    //jwt.sign(payload, secret, options)
    //       What "_id" does:
    //       Acts as the primary key for each document in a MongoDB collection.
    //       Uniquely identifies every document.
    //       Is used internally by MongoDB for indexing and querying.
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    //This is what is returend after a user is created
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  //Implement sign in logic here
  try{
    const { email, password } = req.body; //body we are giving
    const user = await User.findOne({ email }); //finding the email from database

    if(!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        const error = new Error("Invalid password");
        error.statuscode = 401;
        throw error
    }
    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
            token,
            user
        }
    })

  }catch(error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  //Implement sign out logic here
  try {
    // For stateless JWT logout, simply instruct client to remove token
    res.status(200).json({
      success: true,
      message:
        "User signed out successfully. Please remove the token on client-side.",
    });
  } catch (error) {
    next(error);
  }
};
