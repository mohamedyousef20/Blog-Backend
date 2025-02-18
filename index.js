import express from 'express'
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv' 
import mountRoutes from "./routes/index.js"
import errorHandler from './middleware/errorHandler.js';

const app = express();

// to read .env file variable
dotenv.config();


// middleware to read json file 
app.use(express.json());


// mount routes
mountRoutes(app) ;

// global error handling middleware
app.use(errorHandler)


const PORT  = process.env.PORT || 5000

app.listen(PORT , ()=>{
    // connected to mongo db
    connectDB();

    console.log(`server is ready to use on port ${PORT}  now you on ${process.env.NODE_ENV} mood` )
})