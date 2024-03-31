import express from 'express'
import { PORT, DB_URL } from './config/index.js';
import router from './routes/index.js';
import mongoose from 'mongoose'
import cors from 'cors'
import ErrorHandler from './middlewares/ErrorHandler.js';
const app = express();
app.use(cors());
app.use(express.json({limit: '500kb'}));
app.use(express.urlencoded({extended: true}));
app.use(router);
app.get('/', (req, res)=>{
    res.send('<h1>Everything Seems Fine!✌️</h1>');
})

mongoose.connect(DB_URL)
.then(()=>console.log('Connected To DB!'))
.catch((error)=>console.log(`Error Connection to DB ${error}`))

app.use(ErrorHandler)
app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
})