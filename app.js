import dotenv from 'dotenv'
import express from 'express'
dotenv.config()


// database
import connectDB from './db/connect.js'

// error handler
import notFoundMiddleware from './middleware/notFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'


// rest of packages
import morgan from 'morgan'


// middleware
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.send('API is running')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// express 
const app = express()
const port = process.env.PORT || 5000
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
        
        
    }
} 
start()