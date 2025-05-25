import { LockIcon } from "lucide-react";
import React from "react";

const SecurityMetrics = ({ data }) => {
  const metrics = [
    { name: "Attack Detection Rate", value: data.attackDetectionRate },
    { name: "Data Privacy Protection", value: data.dataPrivacyProtection },
    {
      name: "Model Poisoning Resistance",
      value: data.modelPoisoningResistance,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-purple-100 p-2 rounded-full text-purple-700 shadow-inner">
          <LockIcon className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Security Metrics
        </h2>
      </div>

      {/* Metrics List */}
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name}>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>{metric.name}</span>
              <span className="text-gray-600">{metric.value ?? 0}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                style={{ width: `${metric.value ?? 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Status */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 shadow-sm">
        <p className="font-medium flex items-center gap-2">Security Status</p>
        <p className="mt-1">
          All security metrics are within acceptable thresholds.
          <br />
          Last security check: <strong>{data.lastChecked || "N/A"}</strong>.
        </p>
      </div>
    </div>
  );
};

export default SecurityMetrics;
