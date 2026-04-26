from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pandas as pd
import numpy as np
import random
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

app.secret_key = "mediguide_secret_key"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

training = pd.read_csv(os.path.join(BASE_DIR, "Data/Symptom_severity.csv"))

X = training.iloc[:, :-1]
y = training.iloc[:, -1]

encoder = LabelEncoder()
y = encoder.fit_transform(y)

model = RandomForestClassifier(n_estimators=200)
model.fit(X, y)

symptoms_list = list(X.columns)


def extract_symptoms(text):

    text = text.lower()

    synonyms = {
        "head pain": "headache",
        "head hurts": "headache",
        "stomach ache": "stomach_pain",
        "stomach hurting": "stomach_pain",
        "high temperature": "fever",
        "body hot": "fever",
        "throwing up": "vomiting",
        "feeling sick": "nausea",
        "weak": "fatigue",
        "tired": "fatigue"
    }

    for key, val in synonyms.items():
        if key in text:
            text += " " + val

    found = []

    for symptom in symptoms_list:
        s = symptom.replace("_", " ")

        if s in text:
            found.append(symptom)

    return list(set(found))


def predict_disease(symptoms):

    input_vector = np.zeros(len(symptoms_list))

    for s in symptoms:
        if s in symptoms_list:
            input_vector[symptoms_list.index(s)] = 1

    probs = model.predict_proba([input_vector])[0]

    top = probs.argsort()[-5:][::-1]

    results = []

    for i in top:

        confidence = round(probs[i] * 100, 2)

        if confidence >= 10:

            results.append({
                "disease": encoder.inverse_transform([i])[0],
                "confidence": confidence
            })

    return results


def recommend_doctor(disease):

    mapping = {
        "Migraine": "Neurologist",
        "Hypertension": "Cardiologist",
        "Diabetes": "Endocrinologist",
        "Flu": "General Physician",
        "Malaria": "General Physician",
        "Allergy": "Dermatologist",
        "Arthritis": "Orthopedic",
        "Asthma": "Pulmonologist"
    }

    return mapping.get(disease, "General Physician")


@app.route("/")
def home():
    return jsonify({"reply": "MediGuide backend running"})


@app.route("/chat", methods=["POST"])
def chat():

    msg = request.json.get("message", "").strip().lower()

    if msg == "":
        return jsonify({"reply": ""})

    if "step" not in session:
        session["step"] = "symptom"

    step = session["step"]

    if msg in ["hi", "hello", "hey"]:
        session["step"] = "symptom"
        return jsonify({
            "reply": "Hello! I am MediGuide AI. Please describe your symptoms."
        })


    if step == "symptom":

        symptoms = extract_symptoms(msg)

        if not symptoms:
            return jsonify({
                "reply": "Please describe symptoms like fever, headache, cough, stomach pain, nausea or dizziness."
            })

        session["symptoms"] = symptoms
        session["step"] = "duration"

        return jsonify({
            "reply": "How long have you had these symptoms?"
        })


    elif step == "duration":

        if "symptoms" not in session:
            session["step"] = "symptom"
            return jsonify({
                "reply": "Please describe your symptoms again."
            })

        session["duration"] = msg

        results = predict_disease(session["symptoms"])

        if not results:
            session["step"] = "symptom"
            return jsonify({
                "reply": "I couldn't identify a clear condition. Please describe more symptoms."
            })

        main_disease = results[0]["disease"]

        doctor = recommend_doctor(main_disease)

        session["doctor_type"] = doctor
        session["step"] = "appointment"

        text = "Possible conditions:\n\n"

        for r in results:
            text += f"{r['disease']} ({r['confidence']}%)\n"

        text += f"\nRecommended doctor: {doctor}"

        text += "\n\nNote: This is only an AI prediction and not a medical diagnosis."

        text += "\nWould you like to book an appointment? (yes/no)"

        return jsonify({"reply": text})


    elif step == "appointment":

        if msg == "yes":

            session["step"] = "doctor"

            return jsonify({
                "reply": f"Please enter doctor name ({session['doctor_type']})"
            })

        elif msg == "no":

            session.clear()

            return jsonify({
                "reply": "Okay. Stay healthy!"
            })

        else:

            return jsonify({
                "reply": "Please type yes or no."
            })


    elif step == "doctor":

        session["doctor"] = msg
        session["step"] = "date"

        return jsonify({
            "reply": "Enter appointment date"
        })


    elif step == "date":

        session["date"] = msg
        session["step"] = "time"

        return jsonify({
            "reply": "Enter appointment time"
        })


    elif step == "time":

        receipt = {
            "Appointment_ID": random.randint(10000, 99999),
            "Doctor": session["doctor"],
            "Date": session["date"],
            "Time": msg
        }

        session.clear()

        return jsonify({
            "reply": "Appointment Confirmed",
            "receipt": receipt
        })


if __name__ == "__main__":
    app.run(debug=True)