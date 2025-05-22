import { PanelsTopLeft } from "lucide-react";
import React, { useState } from "react";

const PatientDataForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPain: "",
    bp: "",
    cholesterol: "",
    fastingSugar: "",
    restingEcg: "",
    maxHeartRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      age: "",
      sex: "",
      chestPain: "",
      bp: "",
      cholesterol: "",
      fastingSugar: "",
      restingEcg: "",
      maxHeartRate: "",
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

        {/* Chest Pain Type */}
        <div>
          <label className="text-sm">Chest Pain Type</label>
          <select
            name="chestPain"
            value={formData.chestPain}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
        </div>

        {/* Resting BP */}
        <div>
          <label className="text-sm">Resting BP</label>
          <input
            type="number"
            name="bp"
            value={formData.bp}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Cholesterol */}
        <div>
          <label className="text-sm">Cholesterol</label>
          <input
            type="number"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Fasting Blood Sugar */}
        <div>
          <label className="text-sm">Fasting Blood Sugar</label>
          <select
            name="fastingSugar"
            value={formData.fastingSugar}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="0">False</option>
            <option value="1">True</option>
          </select>
        </div>

        {/* Resting ECG */}
        <div>
          <label className="text-sm">Resting ECG</label>
          <select
            name="restingEcg"
            value={formData.restingEcg}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="0">Normal</option>
            <option value="1">ST-T Abnormality</option>
            <option value="2">LV Hypertrophy</option>
          </select>
        </div>

        {/* Max Heart Rate */}
        <div>
          <label className="text-sm">Max Heart Rate</label>
          <input
            type="number"
            name="maxHeartRate"
            value={formData.maxHeartRate}
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
