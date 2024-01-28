import express from 'express'
import { PORT, DB_URL } from './config';
import router from './routes';
import mongoose from 'mongoose'
import cors from 'cors'
import ErrorHandler from './middlewares/ErrorHandler';
const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

mongoose.connect(DB_URL)
.then(()=>console.log('Connected To DB!'))
.catch((error)=>console.log(`Error Connection to DB ${error}`))

app.use(ErrorHandler)
app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
})