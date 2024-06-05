import { configDotenv } from "dotenv"
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js';
import paymentRoute from './routes/payment.route.js'

const app = express()
const port = 4000

configDotenv()
connectDB()

// middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Entry point')
})

app.use('/payments', paymentRoute);

app.listen(port, () => {
    console.log(`📍 Server running on ${port}`)
})
configDotenv()