const express = require('express')
const router = express.Router()
const Book = require("../model/bookModel")

router.post('/',async (req,res)=>{
    try {
        const {title,author,publishYear} = req.body
        if(!title || !author || !publishYear){
           res.status(400)
           throw new Error("please add all the fields")
        }
         const book = await Book.create({
            title,
            author,
            publishYear
           })
        res.status(200).json(book)

    } catch (error) {
        res.status(400).json({error})
    }
})

router.get("/", async (req,res)=>{
 try {
  const books = await Book.find()
  res.status(200).json({
    count:books.length,
    data:books
  })
 } catch (error) {
    res.status(400).json({message:error.message})
 }
})

router.get("/:id", async (req,res)=>{
    try {
     const {id} = req.params
     const book = await Book.findById(id)
     res.status(200).json(book)
    } catch (error) {
       res.status(400).json({message:error.message})
    }
   })

   router.put("/:id", async (req,res)=>{
     try {
        const { title, author, publishYear } = req.body;
        if(!title || !author || !publishYear){
            res.status(400)
            throw new Error("please add all the fields")
         }
         const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id,req.body)
        if(!updatedBook){
            res.status(404).json({message:"Book not found"})
        }
       
        res.status(200).json(updatedBook)
     } catch (error) {
        res.status(400).json({message:error.message}) 
    }
   })

   router.delete("/:id", async(req,res)=>{
    const {id} = req.params

    const deletedBook = await Book.findByIdAndDelete(id)
    if(!deletedBook){
        res.status(404).json({message:"Book not found"})
    }
    res.status(200).json({message:"deleted success"})

   })

module.exports = router