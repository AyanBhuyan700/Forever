import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectCloudinary from './config/Cloudinary.js'
import userRouter from './routes/UserRoute.js'
import productRouter from './routes/ProductRoute.js'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/OrderRoute.js'
dotenv.config()

// Initialize Express
const app = express()
const port = process.env.PORT || 5000
connectCloudinary()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((error) => {
    console.log('Error connecting to MongoDB', error)
})