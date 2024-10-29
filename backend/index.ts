import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import studenRoute from './router/userRoutes';

dotenv.config()

//  MONGO CONNECTION :-

const mongo = process.env.MONGO_URL as string

mongoose.connect(mongo).then(() => console.log('MongoDB Connected'));

//  APP SETUP :-

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/student", studenRoute);

//  PORT Area :-

const PORT = process.env.PORT

app.listen(PORT, () => { `http://localhost:${PORT}` });