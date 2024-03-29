const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const dotenv=require("dotenv");
const res = require('express/lib/response');
const app=express();
dotenv.config();
const port=process.env.PORT || 3000;



mongoose.connect('mongodb+srv://siddhirajdalvi1:@1234567@cluster0.99orktc.mongodb.net/registrationFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const registrationSchema=new mongoose.Schema({
  name :String,
  email : String,
  password : String 
})

const Registration=mongoose.model("Registration",registrationSchema)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/pages/index.html");

})

app.post("/register", async (req,res)=>{
  try {
    const{name,email,password}=req.body;

    const registrationData=new Registration({
      name,
      email,
      password
    });
    await registrationData.save();
    res.redirect("/success")
}
catch (error) {
      console.log(error)
      res.redirect("error")
  }
})

app.get("/success",(req,res)=>{
  res.sendFile(__dirname+"success.html");
})

app.get("/error",(req,res)=>{
  res.sendFile(__dirname+"error.html");
})


app.listen(port,()=>{
console.log(`server is running on port ${port}`);
})

