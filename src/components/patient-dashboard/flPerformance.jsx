import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartAreaIcon } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FlPerformance = ({ data }) => {
  const {
    participatingNodes = 0,
    globalModelRound = 0,
    privacyEpsilon = 0,
    performance = [],
    updatedAt = null,
  } = data || {};

  const labels = performance.map((item) => `Round ${item.round}`);
  const accuracyValues = performance.map((item) => item.accuracy);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Model Accuracy",
        data: accuracyValues,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Federated Learning Model Performance Over Rounds",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Accuracy" },
        min: 0,
        max: 1,
        ticks: { stepSize: 0.1 },
      },
      x: {
        title: { display: true, text: "Rounds" },
      },
    },
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-500">
          <ChartAreaIcon />
        </span>
        <h2 className="text-lg font-semibold text-gray-800">
          Federated Learning Performance
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-md text-center">
          <p className="text-sm text-gray-500">Participating Nodes</p>
          <p className="text-xl font-bold text-gray-800">
            {participatingNodes}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md text-center">
          <p className="text-sm text-gray-500">Global Model Round</p>
          <p className="text-xl font-bold text-gray-800">{globalModelRound}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md text-center">
          <p className="text-sm text-gray-500">Privacy Epsilon</p>
          <p className="text-xl font-bold text-gray-800">{privacyEpsilon}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-md">
        <p className="text-sm text-gray-500 mb-4">
          Federated Learning Model Performance Chart
        </p>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4 text-right">
        Updated: {updatedAt ? formatDate(updatedAt) : "N/A"}
      </div>
    </div>
  );
};

export default FlPerformance;
