const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors())
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Hackathon')
.then(()=>{
    console.log("connected to database")
})
.catch(err=>{
    console.log(err)
})
app.use(express.json());





const advDataSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    phnum:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bank:{
        type:String,
        required:true
    },
    bankDetails:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    lang:{
        type:String,
        required:true
    },
    jobExp:{
        type:String,
        required:true
    }
})

const advData=mongoose.model('advisordetails',advDataSchema)


app.post('/advForm', async (req, res) => {
    const {name,age,email,gender,pass,phnum,address,bank,bankDetails,city,state,lang,jobExp}=req.body
    if(!name){
        return res.status(400).json({ msg: 'Name is required' });
    }
    if(!age){
        return res.status(400).json({ msg: 'Age is required' });
    }
    if(!email){
        return res.status(400).json({ msg: 'Email is required' });
    }
    if(!gender){
        return res.status(400).json({ msg: 'Gender is required' });
    }
    if(!pass){
        return res.status(400).json({ msg: 'Password is required' });
    }
    if(!bank){
        return res.status(400).json({ msg: 'Bank name is required' });
    }
    if(!bankDetails){
        return res.status(400).json({ msg: 'Bank details are required' });
    }
    if(!city){
        return res.status(400).json({ msg: 'City is required' });
    }
    if(!state){
        return res.status(400).json({ msg: 'State is required' });
    }
    if(!lang){
        return res.status(400).json({ msg: 'Preferred language is required' });
    }
    if(!jobExp){
        return res.status(400).json({ msg: 'Job experience is required' });
    }
    const advDetails= await advData.create({name:name,age:age,email:email,gender:gender,
        pass:pass,phnum:phnum,address:address,bank:bank,bankDetails:bankDetails,
        city:city,state:state,lang:lang,jobExp:jobExp})
    const details=await advData.findOne({name:name})
    if(!details){ 
        return res.status(500).json({ msg: 'Failed to create advisorData' });
    }
    return res.status(200).json({msg:details})

})


// Serve the frontend files (optional if using separate frontend)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})