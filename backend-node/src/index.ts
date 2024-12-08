import express from "express";
import usermodel from "./models/usermodel"

const app :any =express();


app.get('/',async(req,res)=>{
  return res.json("got hi");
})



app.listen(5000);