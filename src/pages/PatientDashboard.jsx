import React from "react";
import StatCard from "../components/patient-dashboard/statsCard";
import { User } from "lucide-react";
import PatientDataForm from "../components/patient-dashboard/patientDataForm";
import AnalysisResults from "../components/patient-dashboard/analysisResults";
import FlPerformance from "../components/patient-dashboard/flPerformance";
import SecurityMetrics from "../components/patient-dashboard/securityMatrics";

function PatientDashboard() {
  return (
    <div className="p-2 overflow-hidden">
      <div className="flex gap-5">
        <StatCard
          headerText="Patients Today"
          icon={<User className="text-gray-500 w-5 h-5" />}
          amount="12"
          growthAmount="2"
          growthText="from yesterday"
        />
        <StatCard
          headerText="Patients Today"
          icon={<User className="text-gray-500 w-5 h-5" />}
          amount="12"
          growthAmount="2"
          growthText="from yesterday"
        />
        <StatCard
          headerText="Patients Today"
          icon={<User className="text-gray-500 w-5 h-5" />}
          amount="12"
          growthAmount="2"
          growthText="from yesterday"
        />
        <StatCard
          headerText="Patients Today"
          icon={<User className="text-gray-500 w-5 h-5" />}
          amount="12"
          growthAmount="2"
          growthText="from yesterday"
        />
      </div>
      <div className="mt-10 flex gap-5">
        <div className="w-3/5">
          <PatientDataForm />
        </div>

        <AnalysisResults />
      </div>

      <div className="flex gap-5 justify-between mt-10">
        <div className="w-3/4">
          <FlPerformance />
        </div>

        <SecurityMetrics />
      </div>
    </div>
  );
}

export default PatientDashboard;
