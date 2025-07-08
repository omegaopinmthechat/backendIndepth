import { Router } from "express";

const userRouter = Router();

// GET /users -> get all users
// GET /users/:id

userRouter.get('/', (req, res)=>{
    res.send({title: 'GET all users'})
})

userRouter.get("/:id", (req, res) => {
  res.send({ title: "GET user details" });
});

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