import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/patient-dashboard/statsCard";
import { User } from "lucide-react";
import PatientDataForm from "../components/patient-dashboard/patientDataForm";
import AnalysisResults from "../components/patient-dashboard/analysisResults";
import FlPerformance from "../components/patient-dashboard/flPerformance";
import SecurityMetrics from "../components/patient-dashboard/securityMatrics";

function PatientDashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [cvdCases, setCvdCases] = useState(0);
  const [privacyScore, setPrivacyScore] = useState("Excellent");
  const [results, setResults] = useState({});
  const [securityMetrics, setSecurityMetrics] = useState({});
  const [connectedClients, setConnectedClients] = useState(0);

  useEffect(() => {
    fetchPatientCount();
    fetchCvdCases();
    fetchMLModelResults();
    fetchSecurityMetrics();
    fetchConnectedClients();
  }, []);

  const fetchPatientCount = async () => {
    try {
      const response = await axios.get("/api/patientCount");
      setPatientCount(response.data.count);
    } catch (error) {
      console.error("Error fetching patient count", error);
    }
  };

  const fetchCvdCases = async () => {
    try {
      const response = await axios.get("/api/cvdCases");
      setCvdCases(response.data.count);
    } catch (error) {
      console.error("Error fetching CVD cases", error);
    }
  };

  const fetchMLModelResults = async () => {
    try {
      const response = await axios.get("/api/mlResults");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching ML model results", error);
    }
  };

  const fetchSecurityMetrics = async () => {
    try {
      const response = await axios.get("/api/securityMetrics");
      setSecurityMetrics(response.data);
    } catch (error) {
      console.error("Error fetching security metrics", error);
    }
  };

  const fetchConnectedClients = async () => {
    try {
      const response = await axios.get("/api/connectedClients");
      setConnectedClients(response.data.count);
    } catch (error) {
      console.error("Error fetching connected clients", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: "var(--color-grayLight)" }}
      className="min-h-screen p-6"
    >
      <div className="p-2 overflow-hidden">
        <div className="flex gap-5">
          <StatCard
            headerText="Patients Today"
            icon={<User className="text-gray-500 w-5 h-5" />}
            amount={patientCount}
            growthAmount="2"
            growthText="from yesterday"
          />
          <StatCard
            headerText="CVD Cases"
            icon={<User className="text-gray-500 w-5 h-5" />}
            amount={cvdCases}
            growthAmount="1"
            growthText="from yesterday"
          />
          <StatCard
            headerText="Connected Clients"
            icon={<User className="text-gray-500 w-5 h-5" />}
            amount={connectedClients}
            growthAmount="3"
            growthText="current connections"
          />
          <StatCard
            headerText="Privacy Score"
            icon={<User className="text-gray-500 w-5 h-5" />}
            amount={privacyScore}
            growthAmount=""
            growthText=""
          />
        </div>

        <div className="mt-10 flex gap-5">
          <div className="w-3/5">
            <PatientDataForm />
          </div>

          <AnalysisResults results={results} />
        </div>

        <div className="flex gap-5 justify-between mt-10">
          <div className="w-3/4">
            <FlPerformance />
          </div>

          <SecurityMetrics data={securityMetrics} />
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
