const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // For sending requests to the Python API

const app = express();
app.use(bodyParser.json()); // To parse JSON request bodies

app.post('/process-data', async (req, res) => {
    try {
        const inputData = req.body;

        // Example structure for inputData
        // {
        //   "no_of_dependents": 2,
        //   "income_annum": 500000,
        //   "loan_amount": 200000,
        //   "loan_term": 15,
        //   "cibil_score": 750,
        //   "residential_assets_value": 1000000,
        //   "commercial_assets_value": 500000,
        //   "luxury_assets_value": 200000,
        //   "bank_asset_value": 300000,
        //   "education": "Graduate",
        //   "self_employed": "No"
        // }

        // Send data to Python API for preprocessing and prediction
        const response = await axios.post('http://localhost:5000/predict', inputData);

        // Return the processed output to the client
        res.json({ prediction: response.data.prediction });
    } catch (error) {
        console.error('Error processing data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
