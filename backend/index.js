const express = require("express")
const connectDB = require("./config/db")
const Book = require("./model/bookModel")
const bookRoutes = require("./routes/bookRoute")
const app = express()
const cors = require("cors")

connectDB()

app.use(express.json())
// first option
app.use(cors())

//second option 
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']  
// }))
app.use(express.urlencoded({extended:false}))

app.use("/book",bookRoutes)


app.listen(5000,()=>{
    console.log("app is listening")
})