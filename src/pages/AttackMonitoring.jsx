import React, { useState, useEffect } from 'react';
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
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [attackSummary, setAttackSummary] = useState({
    totalAttacks: 0,
    blockedAttacks: 0,
    activeThreats: 0,
    securityScore: 0
  });
  const [attackTypes, setAttackTypes] = useState([]);
  const [attackPatterns, setAttackPatterns] = useState([]);
  const [recentAttacks, setRecentAttacks] = useState([]);
  const [securityRecommendations, setSecurityRecommendations] = useState([]);
  const [loading, setLoading] = useState({
    summary: true,
    types: true,
    patterns: true,
    recommendations: true
  });
  const [error, setError] = useState({
    summary: null,
    types: null,
    patterns: null,
    recommendations: null
  });

  // Fetch attack summary stats
  useEffect(() => {
    const fetchAttackSummary = async () => {
      try {
        setLoading(prev => ({ ...prev, summary: true }));
        const response = await fetch('/api/attack/summary');
        if (!response.ok) {
          throw new Error('Failed to fetch attack summary');
        }
        const data = await response.json();
        setAttackSummary(data);
        setError(prev => ({ ...prev, summary: null }));
      } catch (err) {
        console.error('Error fetching attack summary:', err);
        setError(prev => ({ ...prev, summary: err.message }));
        // Set default values if API fails
        setAttackSummary({
          totalAttacks: 127,
          blockedAttacks: 124,
          activeThreats: 3,
          securityScore: 94
        });
      } finally {
        setLoading(prev => ({ ...prev, summary: false }));
      }
    };

    fetchAttackSummary();
  }, []);

  // Fetch attack types distribution
  useEffect(() => {
    const fetchAttackTypes = async () => {
      try {
        setLoading(prev => ({ ...prev, types: true }));
        const response = await fetch('/api/attack/types');
        if (!response.ok) {
          throw new Error('Failed to fetch attack types');
        }
        const data = await response.json();
        setAttackTypes(data);
        setError(prev => ({ ...prev, types: null }));
      } catch (err) {
        console.error('Error fetching attack types:', err);
        setError(prev => ({ ...prev, types: err.message }));
        // Set default values if API fails
        setAttackTypes([
          { type: 'Model Poisoning', percentage: 45 },
          { type: 'Data Evasion', percentage: 30 },
          { type: 'Data Theft Attempts', percentage: 25 }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, types: false }));
      }
    };

    fetchAttackTypes();
  }, []);

  // Fetch attack patterns based on selected period
  useEffect(() => {
    const fetchAttackPatterns = async () => {
      try {
        setLoading(prev => ({ ...prev, patterns: true }));
        const response = await fetch(`/api/attacks?period=${selectedPeriod}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attack patterns');
        }
        const data = await response.json();
        setAttackPatterns(data);
        // Extract recent attacks from the patterns data if available
        if (data && data.recentAttacks) {
          setRecentAttacks(data.recentAttacks);
        }
        setError(prev => ({ ...prev, patterns: null }));
      } catch (err) {
        console.error('Error fetching attack patterns:', err);
        setError(prev => ({ ...prev, patterns: err.message }));
        // Set default attack patterns if API fails
        setRecentAttacks([
          { id: 1, type: 'Model Poisoning Attempt', node: 'Node-03', time: '15 minutes ago', risk: 'high' },
          { id: 2, type: 'DDoS Attack', node: 'Node-02', time: '45 minutes ago', risk: 'medium' },
          { id: 3, type: 'Unauthorized Access Attempt', node: 'Node-01', time: '1 hour ago', risk: 'low' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, patterns: false }));
      }
    };

    fetchAttackPatterns();
  }, [selectedPeriod]);

  // Fetch security recommendations
  useEffect(() => {
    const fetchSecurityRecommendations = async () => {
      try {
        setLoading(prev => ({ ...prev, recommendations: true }));
        const response = await fetch('/api/security/recommendations');
        if (!response.ok) {
          throw new Error('Failed to fetch security recommendations');
        }
        const data = await response.json();
        setSecurityRecommendations(data);
        setError(prev => ({ ...prev, recommendations: null }));
      } catch (err) {
        console.error('Error fetching security recommendations:', err);
        setError(prev => ({ ...prev, recommendations: err.message }));
        // Set default recommendations if API fails
        setSecurityRecommendations([
          { id: 1, text: 'Update Node-03 Security Protocol', priority: 'high' },
          { id: 2, text: 'Implement additional model validation', priority: 'medium' },
          { id: 3, text: 'Review access controls for all nodes', priority: 'medium' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, recommendations: false }));
      }
    };

    fetchSecurityRecommendations();
  }, []);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // The attack patterns will be fetched when selectedPeriod changes due to the useEffect dependency
  };

  return (
    <div style={{ backgroundColor: 'var(--color-grayLight)' }} className="min-h-screen p-6">
            <div className="p-2 overflow-hidden">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Attacks" 
          value={loading.summary ? "Loading..." : attackSummary.totalAttacks.toString()} 
          subtitle={loading.summary ? "" : "+12% vs last week"} 
          icon={<Shield size={20} />} 
          iconColor="bg-green-100 p-2 rounded-full text-green-500"
        />

        <StatCard 
          title="Blocked Attacks" 
          value={loading.summary ? "Loading..." : attackSummary.blockedAttacks.toString()} 
          subtitle={loading.summary ? "" : `${((attackSummary.blockedAttacks / attackSummary.totalAttacks) * 100).toFixed(1)}% success rate`} 
          icon={<Shield size={20} />} 
          iconColor="bg-indigo-100 p-2 rounded-full text-indigo-500"
        />

        <StatCard 
          title="Active Threats" 
          value={loading.summary ? "Loading..." : attackSummary.activeThreats.toString()} 
          subtitle={attackSummary.activeThreats > 0 ? "Requires attention" : "All clear"} 
          icon={<AlertCircle size={20} />} 
          iconColor="bg-red-100 p-2 rounded-full text-red-500"
        />

        <StatCard 
          title="Security Score" 
          value={loading.summary ? "Loading..." : `${attackSummary.securityScore}/100`} 
          subtitle={attackSummary.securityScore > 90 ? "Good standing" : "Needs improvement"} 
          icon={<Star size={20} />} 
          iconColor="bg-blue-100 p-2 rounded-full text-blue-500"
        />
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
            {loading.patterns ? (
              <p>Loading attack patterns...</p>
            ) : (
              <>
                {selectedPeriod === 'day' && "Attack Pattern Timeline Chart - Daily View"}
                {selectedPeriod === 'week' && "Attack Pattern Timeline Chart - Weekly View"}
                {selectedPeriod === 'month' && "Attack Pattern Timeline Chart - Monthly View"}
              </>
            )}
          </div>
        </div>

        {/* Attack Types */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Attack Types</h2>
          
          {loading.types ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-400">Loading attack types...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Model Poisoning</span>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Data Evasion</span>
                  <span className="text-sm text-gray-600">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "30%" }}></div>
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
          )}
        </div>
      </div>

      {/* Recent Attacks & Security Recommendations */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Attacks */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Attacks</h2>
          
          {loading.patterns ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-400">Loading recent attacks...</p>
            </div>
          ) : (
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
          )}
        </div>

        {/* Security Recommendations */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Recommendations</h2>
          
          {loading.recommendations ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-400">Loading security recommendations...</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default AttackMonitoring;