const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const cors= require('cors')

const port = 3002;

app.use(express.json());

app.use(cors())

async function queryGemini(Name,age,
    gender,
    maritalStatus,
    dependents,
    education,
    employmentType,
    applicantMonthlyIncome,
    coApplicantMonthlyIncome,
    loanAmountRequested,
    loanTerm,
    creditHistory,
    propertyArea,
    existingLiabilities,
    loanPurpose,
    collateralValue) {
    try {
        console.log(`
            "name": ${Name}
            "applicantAge": ${age},
            "gender": ${gender},
            "maritalStatus": "${maritalStatus}",
            "dependents": ${dependents},
            "education": "${education}",
            "employmentType": "${employmentType}",
            "applicantMonthlyIncome": ${applicantMonthlyIncome},
            "coApplicantMonthlyIncome": ${coApplicantMonthlyIncome},
            "loanAmountRequested": ${loanAmountRequested},
            "loanTerm": "${loanTerm}",
            "creditHistory": ${creditHistory},
            "propertyArea": "${propertyArea}",
            "existingLiabilities": "${existingLiabilities}",
            "loanPurpose": "${loanPurpose}",
            "collateralValue": ${collateralValue}
          `);
        const genAI = new GoogleGenerativeAI('AIzaSyD2j5MWuEFMb1uEofq_Ohmb0sKOWVhfd44');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Provide a loan eligibility prediction based on the following inputs:
input:
{
  "name": ${Name},
  "applicantAge": ${age},
  "gender": "${gender}",
  "maritalStatus": "${maritalStatus}",
  "dependents": ${dependents},
  "education": "${education}",
  "employmentType": "${employmentType}",
  "applicantMonthlyIncome": ${applicantMonthlyIncome},
  "coApplicantMonthlyIncome": ${coApplicantMonthlyIncome},
  "loanAmountRequested": ${loanAmountRequested},
  "loanTerm": "${loanTerm}",
  "creditHistory": ${creditHistory},
  "propertyArea": "${propertyArea}",
  "existingLiabilities": "${existingLiabilities}",
  "loanPurpose": "${loanPurpose}",
  "collateralValue": ${collateralValue}
}
Inputs needed:
Applicant's Age
Gender
Marital Status
Dependents (Number of dependents)
Education (Graduate/Not Graduate)
Employment Type (Salaried/Self-employed/Unemployed)
Applicant's Monthly Income
Co-applicant's Monthly Income
Loan Amount Requested
Loan Term (in months/years)
Credit History (1 for good credit, 0 for poor credit)
Property Area (Urban/Semi-Urban/Rural)
Existing Liabilities (e.g., other loans or EMIs)
Loan Purpose (e.g., Home/Personal/Business)
Collateral Value (if applicable)
Output:
<div class="rconr">
<div class="lt">
Eligible or not eligible for the loan
</div>
<div class="rea">
<div class="rt">Reasons:</div>
*Reason 1<br>
*Reason 2<br>
..
</div>
</div>
If not eligible, provide alternative suggestions to improve eligibility. Ensure the output is concise and specific to the inputs provided.
DO NOT GIVE **Alternative Suggestions to Improve Eligibility:**
html or other word or text`

        var result = await model.generateContent(prompt);



        const generateText= result.response.candidates[0]?.content;
        console.log(generateText.parts[0].text);
        return generateText.parts[0].text || 'No content generated.';
    } catch (error) {
        console.error('Error querying Gemini:', error);
        return null;
    }
}


const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/Hackathon')
.then(() =>{
    console.log('Connected to database')
})
.catch(err=>{
    console.log(err)
})

const userLoanSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String,
        required:true
    },
    dependents:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    employmentType:{
        type:String,
        required:true
    },
    appMonthlyIncome:{
        type:String,
        required:true
    },
    coAppMonthlyIncome:{
        type:String,
        required:true
    },
    loanAmountRequested:{
        type:String,
        required:true
    },
    loanTerm:{
        type:String,
        required:true
    },
    creditHistory:{
        type:String,
        required:true
    },
    propertyArea:{
        type:String,
        required:true
    },
    existingLiabilities:{
        type:String,
        required:true
    },
    loanPurpose:{
        type:String,
        required:true
    },
    collateralValue:{
        type:String,
        required:true
    }
})

const UserLoan=mongoose.model('loaneligibilityform',userLoanSchema)

app.post('/loanPredictionForm',async(req,res)=>{
    const {name,age,gender,maritalStatus,dependents,education,employmentType,appMonthlyIncome,coAppMonthlyIncome,
        loanAmountRequested,loanTerm,creditHistory,propertyArea,existingLiabilities,
        loanPurpose,collateralValue}=req.body
    const loanData=await UserLoan.create({name:name,
        gender:gender,
        maritalStatus:maritalStatus,
        dependents:dependents,
        education:education,
        employmentType:employmentType,
        appMonthlyIncome:appMonthlyIncome,
        coAppMonthlyIncome:coAppMonthlyIncome,
        loanAmountRequested:loanAmountRequested,
        loanTerm:loanTerm,
        creditHistory:creditHistory,
        propertyArea:propertyArea,
        existingLiabilities:existingLiabilities,
        loanPurpose:loanPurpose,
        collateralValue:collateralValue})
    if(!name){
        return res.status(400).json({ msg: 'Name is required' });
    }
    if(!gender){
        return res.status(400).json({ msg: 'Gender is required' });
    }
    if(!maritalStatus){
        return res.status(400).json({ msg: 'Marital Status is required' });
    }
    if(!dependents){
        return res.status(400).json({ msg: 'Number of dependents is required' });
    }
    if(!education){
        return res.status(400).json({ msg: 'Education is required' });
    }
    if(!employmentType){
        return res.status(400).json({ msg: 'Employment Type is required' });
    }
    if(!appMonthlyIncome){
        return res.status(400).json({ msg: 'Annual Applied Monthly Income is required' });
    }
    if(!coAppMonthlyIncome){
        return res.status(400).json({ msg: 'Annual Co-Applied Monthly Income is required' });
    }
    if(!loanAmountRequested){
        return res.status(400).json({ msg: 'Loan Amount Requested is required' });
    }
    if(!loanTerm){
        return res.status(400).json({ msg: 'Loan Term is required' });
    }   
    if(!creditHistory){
        return res.status(400).json({ msg: 'Credit History is required' });
    }
    if(!propertyArea){
        return res.status(400).json({ msg: 'Property Area is required' });
    }
    if(!existingLiabilities){
        return res.status(400).json({ msg: 'Existing Liabilities is required' });
    }
    if(!loanPurpose){
        return res.status(400).json({ msg: 'Loan Purpose is required' });
    }
    if(!collateralValue){
        return res.status(400).json({ msg: 'Collateral Value is required' });
    }
    if(!loanData){
        return res.status(500).json({ msg: 'Failed to create loanData' });
    }
    try {
        const investIQ = await queryGemini(name,age,
            gender,
            maritalStatus,
            dependents,
            education,
            employmentType,
            appMonthlyIncome,
            coAppMonthlyIncome,
            loanAmountRequested,
            loanTerm,
            creditHistory,
            propertyArea,
            existingLiabilities,
            loanPurpose,
            collateralValue)
        
        return res.status(200).json({msg:investIQ})
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


app.use(express.static('public'))



app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

