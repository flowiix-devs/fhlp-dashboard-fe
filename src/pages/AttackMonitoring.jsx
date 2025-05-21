import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Info, 
  Shield, 
  TrendingUp, 
  Star, 
  AlertCircle,
  Lock,
  AlertOctagon
} from 'lucide-react';
import StatCard from '../components/StatCard';

function AttackMonitoring() {
  // Add state for time period selection
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Handler for time period selection
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // In a real application, you would fetch data for the selected period here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Attack Monitoring</h1>
        <div className="flex items-center gap-4">
          <div className="text-gray-600">Threat Level: <span className="text-green-500 font-medium">Low</span></div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
            Scan Network
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-600 text-sm">Total Attacks</div>
              <div className="text-2xl font-bold mt-1">127</div>
              <div className="text-green-500 text-xs mt-1">+12% vs last week</div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Info className="text-green-500" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-600 text-sm">Blocked Attacks</div>
              <div className="text-2xl font-bold mt-1">124</div>
              <div className="text-gray-500 text-xs mt-1">97.6% success rate</div>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <Info className="text-indigo-500" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-600 text-sm">Active Threats</div>
              <div className="text-2xl font-bold mt-1">3</div>
              <div className="text-red-500 text-xs mt-1">Requires attention</div>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <AlertCircle className="text-red-500" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-600 text-sm">Security Score</div>
              <div className="text-2xl font-bold mt-1">94/100</div>
              <div className="text-green-500 text-xs mt-1">Good standing</div>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Star className="text-blue-500" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Attack Patterns & Types */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Attack Patterns */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Attack Patterns</h2>
            <div className="flex mt-2 gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedPeriod === 'day' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePeriodChange('day')}
              >
                Day
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedPeriod === 'week' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePeriodChange('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedPeriod === 'month' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePeriodChange('month')}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-48 flex items-center justify-center text-gray-400">
            {selectedPeriod === 'day' && "Attack Pattern Timeline Chart - Daily View"}
            {selectedPeriod === 'week' && "Attack Pattern Timeline Chart - Weekly View"}
            {selectedPeriod === 'month' && "Attack Pattern Timeline Chart - Monthly View"}
          </div>
        </div>

        {/* Attack Types */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Attack Types</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">DDoS Attacks</span>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Model Poisoning</span>
                <span className="text-sm text-gray-600">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Data Theft Attempts</span>
                <span className="text-sm text-gray-600">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attacks & Security Recommendations */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Attacks */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Attacks</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 p-3 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertOctagon className="text-red-500" size={18} />
                </div>
                <div>
                  <div className="font-medium">Model Poisoning Attempt</div>
                  <div className="text-sm text-gray-500">Node-03 | 15 minutes ago</div>
                </div>
              </div>
              <div className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full">
                High Risk
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <AlertTriangle className="text-yellow-500" size={18} />
                </div>
                <div>
                  <div className="font-medium">DDoS Attack</div>
                  <div className="text-sm text-gray-500">Node-02 | 45 minutes ago</div>
                </div>
              </div>
              <div className="bg-yellow-100 text-yellow-600 px-2 py-1 text-xs rounded-full">
                Medium Risk
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Info className="text-green-500" size={18} />
                </div>
                <div>
                  <div className="font-medium">Unauthorized Access Attempt</div>
                  <div className="text-sm text-gray-500">Node-01 | 1 hour ago</div>
                </div>
              </div>
              <div className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-full">
                Blocked
              </div>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Recommendations</h2>
          
          <div className="bg-white p-4 rounded-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Lock className="text-indigo-600" size={18} />
              </div>
              <div>
                <div className="font-medium">Update Node-03 Security Protocol</div>
                <div className="text-sm text-indigo-600">High Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttackMonitoring;