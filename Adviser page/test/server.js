const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
// const fs = require('fs');
const file=fs.readFileSync('./interviewAns.txt', 'utf8')
// Read the file content
const app = express();
const port = 3004;
app.use(cors());  
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Hackathon')
.then(()=>{
    console.log("connected to database")
})
.catch(err=>{
    console.log(err)
})
app.use(express.json());


// Query Gemini API 
async function queryGemini(qn1, qn2, qn3, qn4, qn5, ans1, ans2, ans3, ans4, ans5) {
    try {
        console.log(qn1+" - "+ans1+"\n"
            +qn2+" - "+ans2+"\n"
            +qn3+" - "+ans3+"\n"
            +qn4+" - "+ans4+"\n"
            +qn5+" - "+ans5+"\n"
        );
        const genAI = new GoogleGenerativeAI('AIzaSyD2j5MWuEFMb1uEofq_Ohmb0sKOWVhfd44');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `I need you to evaluate a candidate's performance in a test consisting of 5 questions. Here is how it should work:
       
        I will provide the candidate's answers for each question.
        Your task:
            1) Evaluate the accuracy and quality of the answers based on your own knowledge of the subject matter.
            2) Assign a rating out of 5 for each answer, based on correctness, completeness, and relevance.
            3) Highlight strengths and weaknesses in the candidate's responses.
        Generate a brief report summarizing:
            1) Areas where the candidate performed well. Areas needing improvement.
        
        
        The questions and the candidate's responses are given as folowed
        Question 1: ${qn1} - Candidate's Answer: ${ans1}
        Question 2: ${qn2} - Candidate's Answer: ${ans2}
        Question 3: ${qn3} - Candidate's Answer: ${ans3}
        Question 4: ${qn4} - Candidate's Answer: ${ans4}
        Question 5: ${qn5} - Candidate's Answer: ${ans5}
        
        Verify the answers using your own general knowledge. You can also refer this file ${file} if needed,
        


        Provide whether the candidate is Qualified or Not Qualified, provide his skill rating out of 5 
        also provide why the candidate has not been qualified if he is not qualified or if the candidate has been qualified provide why the candidate has been qualified as the reason

        The result should be displayed in the format which is given below

        {
            rating: "Give the candidates overall rating out of five (0 if answer is empty)",
            Qualification: "Give whether the candidate is qualified or not qualified (not qualified if answer is empty)",
            reason: "Give the reason why the candidate is qualified or not qualified"
        }
        ` 

        var result = await model.generateContent(prompt);

       
   

        const generateText= result.response.candidates[0]?.content;
        console.log(generateText.parts[0].text);
        return generateText.parts[0].text || 'No content generated.';
    } catch (error) {
        console.error('Error querying Gemini:', error);
        return null;
    }
}

app.post('/evaluate', async (req, res) => {
    const { qn1,ans1,qn2,ans2,qn3,ans3,qn4,ans4,qn5,ans5 } = req.body;
    try{
        const score = await queryGemini(qn1, qn2, qn3, qn4, qn5,ans1,ans2,ans3,ans4,ans5)
        if(!score){
            return res.status(500).json({ msg: 'Failed to evaluate the test' });
        }
        return res.status(200).json({msg:score})
        //remove all words before a spcific word (eg. the first word is the test name and , remove the words before "is")



    }catch(err){
        console.error('Error in /evaluate:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
})

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


//search profile
app.post('/search',async(req,res)=>{
    const {search}=req.body
    const details=await advData.findOne({name:search})
    if(!details){
        return res.status(404).json({ msg: 'No advisor found' });
    }
    return res.status(200).json({msg:details.name})
})

//get all details from database

// Serve the frontend files (optional if using separate frontend)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 