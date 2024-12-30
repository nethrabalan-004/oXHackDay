import sys
import json
import numpy as np
import pickle

# Load the model (replace with your model path)
model_path = './loan_eligibility_model.pkl'
with open(model_path, 'rb') as file:
    model = pickle.load(file)

def predict(features):
    """Predict based on input features."""
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)
    return int(prediction[0])

if __name__ == '__main__':
    try:
        # Parse input features from Node.js
        input_features = json.loads(sys.argv[1])
        prediction = predict(input_features)
        print(prediction)
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
