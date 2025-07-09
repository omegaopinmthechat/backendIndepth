import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// GET /users -> get all users
// GET /users/:id

userRouter.get('/', getUsers)

userRouter.get("/:id", authorize, getUser) //authorize is the middleware

userRouter.post("/", (req, res) => {
  res.send({ title: "Create a new user" });
});

userRouter.put('/:id', (req, res) =>{
    res.send({title: 'update user'});
})

userRouter.delete('/:id', (req, res) =>{
    res.send({title: "delete user"});
})

export default userRouter;