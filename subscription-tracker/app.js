import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/subscriptions.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

//app.use(express.json()); //use is used when i want to tell the application its going to use json
app.use('/api/v1/auth', authRouter); //UNDERSTAND THIS PATH
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);

//route (using routes is a more structured approach)
app.get('/', (req, res) =>{
    res.send("Welcome to the subcription tracker api!")
});


app.listen(PORT, () =>{
    console.log(`Server running on port http://localhost:${PORT}`)
})

export default app;