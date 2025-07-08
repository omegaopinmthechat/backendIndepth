import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/subscriptions.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';

const app = express();

//built in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

//app.use(express.json()); //use is used when i want to tell the application its going to use json
app.use('/api/v1/auth', authRouter); //UNDERSTAND THIS PATH
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);

//custom middleware
app.use(errorMiddleware);

//route (using routes is a more structured approach)
app.get('/', (req, res) =>{
    res.send("Welcome to the subcription tracker api!")
});


app.listen(PORT,async () =>{
    console.log(`Server running on port http://localhost:${PORT}`)
    await connectToDatabase();
})

export default app;