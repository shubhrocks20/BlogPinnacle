import express from 'express'
import { PORT, DB_URL } from './config';
import router from './routes';
import mongoose from 'mongoose'
import cors from 'cors'
const app = express();
app.use(cors());

app.use(express.json());
app.use(router);
// app.set('view engine', 'ejs');
// console.log(app.get('views'))

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});



app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
})