const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Endpoint for prediction
app.post('/predict', (req, res) => {
    try {
        const input_data = req.body;

        // Expected fields
        const expectedFields = [
            'loan_id', 'no_of_dependents', 'education', 'self_employed',
            'income_annum', 'loan_amount', 'loan_term', 'cibil_score',
            'residential_assets_value', 'commercial_assets_value',
            'luxury_assets_value', 'bank_asset_value'
        ];

        // Check for missing fields
        const missingFields = expectedFields.filter(field => !(field in input_data));
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
        }

        // Map categorical data to numeric encoding
        const categoricalMappings = {
            education: { Graduate: 0, Undergraduate: 1, 'High School': 2 },
            self_employed: { Yes: 1, No: 0 }
        };

        try {
            // Transform features
            const numericalFeatures = [
                input_data.no_of_dependents,
                input_data.income_annum,
                input_data.loan_amount,
                input_data.loan_term,
                input_data.cibil_score,
                input_data.residential_assets_value,
                input_data.commercial_assets_value,
                input_data.luxury_assets_value,
                input_data.bank_asset_value
            ].map(Number);

            const categoricalFeatures = [
                categoricalMappings.education[input_data.education],
                categoricalMappings.self_employed[input_data.self_employed]
            ];

            const features = [...numericalFeatures, ...categoricalFeatures];

            // Call Python script using PythonShell
            PythonShell.run(
                'model_predict.py', 
                { args: [JSON.stringify(features)] }, 
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: `Error: ${err.message}` });
                    }
                    res.json({ prediction: result[0] });
                }
            );
        } catch (err) {
            res.status(400).json({ error: `Error in data transformation: ${err.message}` });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
