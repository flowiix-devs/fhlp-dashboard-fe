import React, { useState } from "react";
import axios from "axios";
import { PanelsTopLeft } from "lucide-react";

const PatientDataForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    education: "",
    currentSmoker: "",
    cigsPerDay: "",
    BPMeds: "",
    prevalentStroke: "",
    prevalentHyp: "",
    diabetes: "",
    totChol: "",
    sysBP: "",
    diaBP: "",
    bmi: "",
    heartRate: "",
    glucose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      age: "",
      sex: "",
      education: "",
      currentSmoker: "",
      cigsPerDay: "",
      BPMeds: "",
      prevalentStroke: "",
      prevalentHyp: "",
      diabetes: "",
      totChol: "",
      sysBP: "",
      diaBP: "",
      bmi: "",
      heartRate: "",
      glucose: "",
    });
  };

  const handleAnalyse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/analyse-patient",
        formData
      );
      console.log("Analysis Result:", response.data);
      alert("Analysis submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Check the console for more info.");
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow w-full max-w-3xl space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-500">
          <PanelsTopLeft />
        </span>
        <h2 className="text-lg font-semibold text-gray-800">
          Patient Data Input
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "age", label: "Age", type: "number" },
          {
            name: "sex",
            label: "Sex",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "0", label: "Female" },
              { value: "1", label: "Male" },
            ],
          },
          {
            name: "education",
            label: "Education",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "1", label: "Less than High School" },
              { value: "2", label: "High School Graduate" },
              { value: "3", label: "Some College/Technical School" },
              { value: "4", label: "College Graduate or Higher" },
            ],
          },
          {
            name: "currentSmoker",
            label: "Current Smoker",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ],
          },
          { name: "cigsPerDay", label: "Cigarettes Per Day", type: "number" },
          {
            name: "BPMeds",
            label: "BP Medications",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ],
          },
          {
            name: "prevalentStroke",
            label: "Prevalent Stroke",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ],
          },
          {
            name: "prevalentHyp",
            label: "Prevalent Hypertension",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ],
          },
          {
            name: "diabetes",
            label: "Diabetes",
            type: "select",
            options: [
              { value: "", label: "Select" },
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ],
          },
          { name: "totChol", label: "Total Cholesterol", type: "number" },
          { name: "sysBP", label: "Systolic BP", type: "number" },
          { name: "diaBP", label: "Diastolic BP", type: "number" },
          { name: "bmi", label: "BMI", type: "number" },
          { name: "heartRate", label: "Heart Rate", type: "number" },
          { name: "glucose", label: "Glucose", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-sm">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8 justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear Form
        </button>
        <button
          type="button"
          onClick={handleAnalyse}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Analyse Patient
        </button>
      </div>
    </form>
  );
};

export default PatientDataForm;
