import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:"https://mental-mate-1.onrender.com",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port,()=>{
    console.log("Server started")
    connectDB();
})

