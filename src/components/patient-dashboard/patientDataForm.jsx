import { PanelsTopLeft } from "lucide-react";
import React, { useState } from "react";

const PatientDataForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "", // 0 = Female, 1 = Male
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

  const handleAnalyse = () => {
    console.log(formData);
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
        {/* Age */}
        <div>
          <label className="text-sm">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Sex */}
        <div>
          <label className="text-sm">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="text-sm">Education</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="1">Less than High School</option>
            <option value="2">High School Graduate</option>
            <option value="3">Some College/Technical School</option>
            <option value="4">College Graduate or Higher</option>
          </select>
        </div>

        {/* Current Smoker */}
        <div>
          <label className="text-sm">Current Smoker</label>
          <select
            name="currentSmoker"
            value={formData.currentSmoker}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Cigarettes Per Day */}
        <div>
          <label className="text-sm">Cigarettes Per Day</label>
          <input
            type="number"
            name="cigsPerDay"
            value={formData.cigsPerDay}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* BP Meds */}
        <div>
          <label className="text-sm">BP Medications</label>
          <select
            name="BPMeds"
            value={formData.BPMeds}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Prevalent Stroke */}
        <div>
          <label className="text-sm">Prevalent Stroke</label>
          <select
            name="prevalentStroke"
            value={formData.prevalentStroke}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Prevalent Hypertension */}
        <div>
          <label className="text-sm">Prevalent Hypertension</label>
          <select
            name="prevalentHyp"
            value={formData.prevalentHyp}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Diabetes */}
        <div>
          <label className="text-sm">Diabetes</label>
          <select
            name="diabetes"
            value={formData.diabetes}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Total Cholesterol */}
        <div>
          <label className="text-sm">Total Cholesterol</label>
          <input
            type="number"
            name="totChol"
            value={formData.totChol}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Systolic BP */}
        <div>
          <label className="text-sm">Systolic BP</label>
          <input
            type="number"
            name="sysBP"
            value={formData.sysBP}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Diastolic BP */}
        <div>
          <label className="text-sm">Diastolic BP</label>
          <input
            type="number"
            name="diaBP"
            value={formData.diaBP}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* BMI */}
        <div>
          <label className="text-sm">BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Heart Rate */}
        <div>
          <label className="text-sm">Heart Rate</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Glucose */}
        <div>
          <label className="text-sm">Glucose</label>
          <input
            type="number"
            name="glucose"
            value={formData.glucose}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Buttons */}
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
