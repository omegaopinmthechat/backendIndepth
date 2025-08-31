import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/subscriptions.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


//  What next() Does
// In Express, next() is a function that tells Express to:

// “Move on to the next middleware or route handler in the chain.”

//  So when you call next(), you’re saying:
// “I’m done with my job. Let the next function handle the rest.”

// example of next:
// app.use((req, res, next) => {
//     console.log("I run first");
//     next(); // Moves to the next middleware
//   });
  
//   app.use((req, res, next) => {
//     console.log("I run second");
//     res.send("Done");
//   });

const app = express();

//built in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(arcjetMiddleware)

//app.use(express.json()); //use is used when i want to tell the application its going to use json
app.use('/api/v1/auth', authRouter); //UNDERSTAND THIS PATH
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);
app.use('api/v1/workflows', workflowRouter);

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