import express from 'express'
import connectDB from './db/connectDB.js'


const app=express()
const PORT=3000

connectDB()
app.get('/',(req,res)=>{
    res.send('Welcome to my server')
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})