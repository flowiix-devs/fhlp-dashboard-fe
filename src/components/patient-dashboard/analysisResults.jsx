import React from "react";
import { Heart } from "lucide-react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "barcolor",
})(({ theme, barcolor }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[300],
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      barcolor || (theme.palette.mode === "dark" ? "#308fe8" : "#1a90ff"),
  },
}));

const AnalysisResults = () => {
  const predictionProbability = 87.2;
  const riskFactors = [
    { name: "Age", impact: "High Impact" },
    { name: "Cholesterol", impact: "High Impact" },
    { name: "Chest Pain", impact: "Medium Impact" },
    { name: "Max Heart Rate", impact: "Medium Impact" },
  ];
  const modelConfidence = {
    accuracy: 94.7,
    precision: 92.3,
    recall: 89.5,
  };

  // Get impact color based on level
  const getImpactColor = (impact) => {
    switch (impact) {
      case "High Impact":
        return "text-red-600";
      case "Medium Impact":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getBarColor = (value) => {
    if (value >= 80) return "#ef4444";
    if (value >= 50) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <header className="flex items-center mb-6">
        <Heart className="text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Analysis Results
        </h2>
      </header>

      <section
        aria-labelledby="prediction-heading"
        className="flex gap-5 mb-6 "
      >
        {/* Prediction Section */}
        <article
          className="p-6 border-[1px] border-gray-200 rounded-lg flex-1 bg-gray-100"
          aria-label="Heart Disease Prediction"
        >
          <h3
            id="prediction-heading"
            className="text-lg font-medium text-gray-700"
          >
            Heart Disease Prediction
          </h3>
          <div className="mt-2">
            <span
              className="text-3xl font-bold text-purple-600"
              aria-live="polite"
            >
              {predictionProbability.toFixed(1)}%
            </span>
            <span className="ml-2 text-gray-600">Probability</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <BorderLinearProgress
                variant="determinate"
                value={predictionProbability}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Based on 13 input parameters and federated model
            </p>
          </div>
        </article>

        {/* Risk Factors Section */}
        <article
          className="p-6 border-[1px] border-gray-200 rounded-lg flex-1 bg-gray-100"
          aria-label="Risk Factors"
        >
          <h3 className="text-lg font-medium text-gray-700">Risk Factors</h3>
          <ul className="mt-4 space-y-2">
            {riskFactors.map((factor, index) => (
              <>
                <li key={index} className="">
                  <div className="flex justify-between text-sm ">
                    <span className="text-gray-700">{factor.name}</span>
                    <span
                      className={`font-medium ${getImpactColor(factor.impact)}`}
                    >
                      {factor.impact}
                    </span>
                  </div>
                  <hr className="text-gray-300" />
                </li>
              </>
            ))}
          </ul>
        </article>
      </section>

      {/* Model Confidence Section */}
      <section
        aria-labelledby="model-confidence-heading"
        className="p-6 border-gray-200 border-[1px] bg-gray-100 rounded-lg"
      >
        <h3
          id="model-confidence-heading"
          className="text-lg font-medium text-gray-700"
        >
          Model Confidence
        </h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {Object.entries(modelConfidence).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-600 capitalize">{key}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <BorderLinearProgress
                  variant="determinate"
                  value={predictionProbability}
                  barcolor={getBarColor(predictionProbability)}
                />
              </div>
              <span className="text-sm font-medium text-green-600">
                {value}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalysisResults;
