


require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
// const fs = require('fs');

// Read the file content
const fileContent = fs.readFileSync('./data.txt', 'utf-8');
const app = express();
const port = 3001;
app.use(cors());

app.use(express.json());


// Query Gemini API 
async function queryGemini(name, no,  email,dob,AnnualIncome, Investment,investmentType, specificCondition, duration, city) {
    try {
        console.log(name+" "+no+" "+dob+" "+AnnualIncome+" "+investmentType+" "+specificCondition+" "+duration+" "+Investment+" "+city);
        const genAI = new GoogleGenerativeAI('AIzaSyD2j5MWuEFMb1uEofq_Ohmb0sKOWVhfd44');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        As an investment adviser, based on the provided information, generate recommendations for 5 government and 5 non-government schemes or policies in India tailored to the user's specific needs, investment amount, duration, and other criteria. 
        
        "input": {
          "name": "${name}",
          "no": "${no}",
          "email": "${email}",
          "dob": "${dob}",
          "AnnualIncome": ${AnnualIncome},
          "Investment": ${Investment},
          "investmentType": "${investmentType}",
          "specificCondition": "${specificCondition}",
          "duration": ${duration} (in years),
          "city": "${city}"
        }
        
        If required, refer to this file for policy comparisons and suggestions: "file": ${fileContent}.
        
        **Output Format**:
        Only produce the output in the specified <div> format. Do not include additional text, explanations, or HTML outside this structure. The structure for each recommendation should be:
        
        <div class="reee">
          Type: [gov or non-gov],
          Name: [Name of the scheme, policy, or insurance],
          Details: [Definition and explanation of the scheme or policy in 3 lines],
          Profit return percentage: [Percentage],
          Benefits: [List 5 benefits],
          Risk level: [low/medium/high],
          Disadvantages: [Mention associated risks],
          Duration: [Duration in years],
          Investment amount: [Annual investment amount]
        </div>
        
        Ensure each recommendation provides concise and clear details, focusing on the user's criteria. 
        Only output the <div> tags with content in the given format.It should not generate html or text or any other conatent or letter rather than output format`;
        

        var result = await model.generateContent(prompt);

       
   

        const generateText= result.response.candidates[0]?.content;
        console.log(generateText.parts[0].text);
        return generateText.parts[0].text || 'No content generated.';
    } catch (error) {
        console.error('Error querying Gemini:', error);
        return null;
    }
}

// Endpoint to handle file upload and  generation
app.post('/invest', async (req, res) => {

    const { name, no, email, dob, AnnualIncome, Investment, investmentType, specificCondition, duration, city } = req.body;
    try {
        
        const investIQ = await queryGemini(name, no,  email,dob,AnnualIncome, Investment,investmentType, specificCondition, duration, city);
        if (!investIQ) {
            return res.status(500).json({ error: 'Failed to generate ' });
        }
        // console.log(investIQ)
        res.json({msg: investIQ });
    } catch (error) {
        console.error('Error in /generate-bail-petition:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the frontend files (optional if using separate frontend)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

