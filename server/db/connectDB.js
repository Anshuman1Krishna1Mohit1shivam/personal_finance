import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://mohit030802:X3niy3cQetpqxwX1@cluster0.gcg4ory.mongodb.net/?retryWrites=true&w=majority@appName=Cluster0')
        console.log("Sucessfully connected to db")
    } catch (error) {
        
        console.log(error)
    }
}

export default connectDB