


require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
// const fs = require('fs');

// Read the file content
const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());


// Query Gemini API 
async function queryGemini(name,
    dob, 
    gender, 
    maritalStatus, 
    AnnualIncome, 
    insuranceType, 
    doYouHaveHealthInsuranceOfTermLife, 
    houseOwnershipStatus, 
    city, 
    state, 
    occupation, 
    workExperienceDuration, 
    doYouHaveHealthInsuranceOfCriticalIllness, 
    childAge, 
    occupationOfIncomeProtection, 
    workExperienceDurationOfIncomeProtection, 
    familyMembers, 
    doYouHaveHealthInsurance, 
    healthHistory, 
    doYouHavePreExistingVehicleInsurance, 
    renewExistingInsuranceVehicle, 
    doYouOwnPet, 
    animalType, 
    applyingForNew, 
    typeOfAutomobile, 
    doYouHavePreExistingInsuranceOfAutomobile, 
    areYouApplyingForNewInsuranceOfAutomobile, 
    renewExistingInsuranceOfAutomobile, 
    farmLocation, 
    cropType, 
    totalFarmSize, 
    liveStockType, 
    vesselNameOfMarine, 
    cargoDescription, 
    cargoValue,
    CoverageType, 
    voyageRoute, 
    businessName, 
    employeeJobTitle, 
    totalAnnualPayroll, 
    coverageAmount, 
    safetyProgramInPlace, 
    profession, 
    doYouHaveCybersecurityIncidentResponsePlan, 
    coverageAmountCyber, 
    haveYouHadAnyCyberIncidentsInThePast3Years, 
    doYouUseMultiFactorAuthenticationMFA ) {
    try {
        
        console.log({
            "name": name, 
            "dob": dob, 
            "gender": gender, 
            "maritalStatus": maritalStatus, 
            "AnnualIncome": AnnualIncome, 
            "insuranceType": insuranceType, 
            "doYouHaveHealthInsuranceOfTermLife": doYouHaveHealthInsuranceOfTermLife, 
            "houseOwnershipStatus": houseOwnershipStatus, 
            "city": city, 
            "state": state, 
            "occupation": occupation, 
            "workExperienceDuration": workExperienceDuration, 
            "doYouHaveHealthInsuranceOfCriticalIllness": doYouHaveHealthInsuranceOfCriticalIllness, 
            "childAge": childAge, 
            "occupationOfIncomeProtection": occupationOfIncomeProtection, 
            "workExperienceDurationOfIncomeProtection": workExperienceDurationOfIncomeProtection, 
            "familyMembers": familyMembers, 
            "doYouHaveHealthInsurance": doYouHaveHealthInsurance, 
            "healthHistory": healthHistory, 
            "doYouHavePreExistingVehicleInsurance": doYouHavePreExistingVehicleInsurance, 
            "renewExistingInsuranceVehicle": renewExistingInsuranceVehicle, 
            "doYouOwnPet": doYouOwnPet, 
            "animalType": animalType, 
            "applyingForNew": applyingForNew, 
            "typeOfAutomobile": typeOfAutomobile, 
            "doYouHavePreExistingInsuranceOfAutomobile": doYouHavePreExistingInsuranceOfAutomobile, 
            "areYouApplyingForNewInsuranceOfAutomobile": areYouApplyingForNewInsuranceOfAutomobile, 
            "renewExistingInsuranceOfAutomobile": renewExistingInsuranceOfAutomobile, 
            "farmLocation": farmLocation, 
            "cropType": cropType, 
            "totalFarmSize": totalFarmSize, 
            "liveStockType": liveStockType, 
            "vesselNameOfMarine": vesselNameOfMarine, 
            "cargoDescription": cargoDescription, 
            "cargoValueCoverageType": cargoValue, 
            "CoverageType":CoverageType,
            "voyageRoute": voyageRoute, 
            "businessName": businessName, 
            "employeeJobTitle": employeeJobTitle, 
            "totalAnnualPayroll": totalAnnualPayroll, 
            "coverageAmount": coverageAmount, 
            "safetyProgramInPlace": safetyProgramInPlace, 
            "profession": profession, 
            "doYouHaveCybersecurityIncidentResponsePlan": doYouHaveCybersecurityIncidentResponsePlan, 
            "coverageAmountCyber": coverageAmountCyber, 
            "haveYouHadAnyCyberIncidentsInThePast3Years": haveYouHadAnyCyberIncidentsInThePast3Years, 
            "doYouUseMultiFactorAuthenticationMFA": doYouUseMultiFactorAuthenticationMFA
          });
          

        const genAI = new GoogleGenerativeAI('AIzaSyD2j5MWuEFMb1uEofq_Ohmb0sKOWVhfd44');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


        const prompt = `You are an insurance recommendation master. Do not include any disclaimer, note, or additional information other than the specified output format. 

        Generate a list of top 5 to 10 insurance schemes from both government and non-government (minimum 1 from gov and one from non gov should present) providers based on the following criteria:
        output formate:
        <div class="reee">
        Type (gov or non-gov)<br>
        Name of the insurance<br>
        A 3-line explanation or definition of the insurance<br>
        Profit return percentage (mention 'N/A' for health insurance)<br>
        Five benefits of the insurance (add <br> after each benefit)<br>
        Risk level (low, medium, or high)<br>
        Disadvantages (potential risks or limitations)<br>
        Duration of the insurance in years<br>
        Annual premium amount (investment amount)<br>
        </div>
        Do not generate any extra word, note, or text other than the specified format and the requested content. Only provide the requested output in the specified structure.
        dont not mention even the type of code your returning except the div no there word or text should be given as output
        `;
        ;
      
        var result = await model.generateContent(prompt);

       
   

        const generateText= result.response.candidates[0]?.content;
        console.log(generateText.parts[0].text);
        return generateText.parts[0].text || 'No content generated.';
    } catch (error) {
        console.error('Error querying Gemini:', error);
        return null;
    }
}

// Endpoint to handle file upload and bail petition generation
app.post('/insure', async (req, res) => {

    const { 
        name,
        dob, 
        gender, 
        maritalStatus, 
        AnnualIncome, 
        insuranceType, 
        doYouHaveHealthInsuranceOfTermLife, 
        houseOwnershipStatus, 
        city, 
        state, 
        occupation, 
        workExperienceDuration, 
        doYouHaveHealthInsuranceOfCriticalIllness, 
        childAge, 
        occupationOfIncomeProtection, 
        workExperienceDurationOfIncomeProtection, 
        familyMembers, 
        doYouHaveHealthInsurance, 
        healthHistory, 
        doYouHavePreExistingVehicleInsurance, 
        renewExistingInsuranceVehicle, 
        doYouOwnPet, 
        animalType, 
        applyingForNew, 
        typeOfAutomobile, 
        doYouHavePreExistingInsuranceOfAutomobile, 
        areYouApplyingForNewInsuranceOfAutomobile, 
        renewExistingInsuranceOfAutomobile, 
        farmLocation, 
        cropType, 
        totalFarmSize, 
        liveStockType, 
        vesselNameOfMarine, 
        cargoDescription, 
        cargoValue,
        CoverageType, 
        voyageRoute, 
        businessName, 
        employeeJobTitle, 
        totalAnnualPayroll, 
        coverageAmount, 
        safetyProgramInPlace, 
        profession, 
        doYouHaveCybersecurityIncidentResponsePlan, 
        coverageAmountCyber, 
        haveYouHadAnyCyberIncidentsInThePast3Years, 
        doYouUseMultiFactorAuthenticationMFA 
      } = req.body;
      
    try {
        
        const investIQ = await queryGemini(name,
            dob,
            gender,
            maritalStatus,
            AnnualIncome,
            insuranceType,
            doYouHaveHealthInsuranceOfTermLife,
            houseOwnershipStatus,
            city,
            state,
            occupation,
            workExperienceDuration,
            doYouHaveHealthInsuranceOfCriticalIllness,
            childAge, 
            occupationOfIncomeProtection, 
            workExperienceDurationOfIncomeProtection, 
            familyMembers, 
            doYouHaveHealthInsurance, 
            healthHistory, 
            doYouHavePreExistingVehicleInsurance, 
            renewExistingInsuranceVehicle, 
            doYouOwnPet, 
            animalType, 
            applyingForNew, 
            typeOfAutomobile, 
            doYouHavePreExistingInsuranceOfAutomobile, 
            areYouApplyingForNewInsuranceOfAutomobile, 
            renewExistingInsuranceOfAutomobile, 
            farmLocation, 
            cropType, 
            totalFarmSize, 
            liveStockType, 
            vesselNameOfMarine, 
            cargoDescription, 
            cargoValue,
            CoverageType, 
            voyageRoute, 
            businessName, 
            employeeJobTitle, 
            totalAnnualPayroll, 
            coverageAmount, 
            safetyProgramInPlace, 
            profession, 
            doYouHaveCybersecurityIncidentResponsePlan, 
            coverageAmountCyber, 
            haveYouHadAnyCyberIncidentsInThePast3Years, 
            doYouUseMultiFactorAuthenticationMFA );
        if (!investIQ) {
            return res.status(500).json({ error: 'Failed to generate bail petition' });
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

