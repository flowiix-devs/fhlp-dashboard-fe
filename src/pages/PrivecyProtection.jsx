import { useState, useEffect } from 'react';
import { Shield, Lock, ClipboardCheck, FileText, Fingerprint, User } from 'lucide-react';
import StatusItem from '../components/StatusItem';
import StatCard from '../components/StatCard';
import SliderControl from '../components/SliderControl';
import DataProtectionItem from '../components/DataProtectionItem';

export default function PrivacyProtection() {
  const [noiseLevel, setNoiseLevel] = useState(60);
  const [epsilonValue, setEpsilonValue] = useState(0.75);
  const [clippingThreshold, setClippingThreshold] = useState(80);
  const [activeTab, setActiveTab] = useState('Basic');
  const [modelAccuracy, setModelAccuracy] = useState(95); // Default value

  // State for privacy status details
  const [encryptionStatus, setEncryptionStatus] = useState({
    active: true,
    type: 'AES-256',
    lastVerified: 'Just now'
  });
  const [privacyCompliance, setPrivacyCompliance] = useState({
    status: true,
    percentage: 98,
    profile: 'Balanced',
    dpScore: 0.75
  });
  const [accessControls, setAccessControls] = useState({
    configured: true,
    type: 'Multi-Factor'
  });

  // State for data anonymization status
  const [dataAnonymizationStatus, setDataAnonymizationStatus] = useState({
    biometricData: true,
    medicalRecords: true,
    personalInfo: true
  });

  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Calculate DP score based on provided formula
  const calculateDPScore = (profile, noise, epsilon, threshold, accuracy) => {
    const accuracyFactor = (100 - accuracy) / 100;
    let dpScore = 0;

    if (profile === 'Basic') {
      // dp = (100 - model accuracy) / 100 + (noise*10 + epsilon*10 + threshold*10)
      dpScore = accuracyFactor + (noise * 0.1 + epsilon * 10 + threshold * 0.1);
    } else if (profile === 'Balanced') {
      // dp = (100 - model accuracy) / 100 + (noise*100 + round(epsilon*10) + threshold*10)
      dpScore = accuracyFactor + (noise * 1 + Math.round(epsilon * 10) + threshold * 0.1);
    } else if (profile === 'Strict') {
      // dp = (100 - model accuracy) / 100 + (noise*100 + round(epsilon*10))
      dpScore = accuracyFactor + (noise * 1 + Math.round(epsilon * 10));
    }

    return Math.round(dpScore * 100) / 100; // Round to 2 decimal places
  };

  // Determine privacy profile based on noise, epsilon, and threshold
  const determinePrivacyProfile = (noise, epsilon, threshold) => {
    // Convert slider values to appropriate ranges
    const normalizedNoise = noise / 100;
    const normalizedThreshold = threshold / 100;

    if (normalizedNoise <= 0.4 && epsilon >= 0.9) {
      return 'Basic';
    } else if (normalizedNoise >= 0.8 && epsilon <= 0.6) {
      return 'Strict';
    } else {
      return 'Balanced';
    }
  };

  // Update privacy profile based on slider values
  const updatePrivacyProfile = (noise, epsilon, threshold) => {
    const profile = determinePrivacyProfile(noise, epsilon, threshold);
    const dpScore = calculateDPScore(
      profile,
      noise / 100, // Normalize to 0-1 range
      epsilon,
      threshold / 100, // Normalize to 0-1 range
      modelAccuracy
    );

    setPrivacyCompliance(prev => ({
      ...prev,
      profile: profile,
      dpScore: dpScore,
      // Consider compliant if dpScore is above a threshold
      status: dpScore > 0.5,
      percentage: Math.min(Math.round(dpScore * 100), 100)
    }));

    // Update data anonymization status based on privacy settings
    updateDataAnonymizationStatus(profile, dpScore > 0.5);
  };

  // Update data anonymization status based on privacy settings
  const updateDataAnonymizationStatus = (profile, dpActive) => {
    let bioProtected = false;
    let medicalProtected = false;
    let personalProtected = false;

    // Logic as per requirements
    // if dp presented, threshold bio data is protected
    if (dpActive) {
      bioProtected = true;
    }

    // if SA + dp presented, bio data and record data protected
    const saActive = true; // Assuming SA is active for now
    if (saActive && dpActive) {
      bioProtected = true;
      medicalProtected = true;
    }

    // if SA + dp + smpc presented, all protected
    const smpcActive = profile === 'Strict'; // Assuming SMPC is active in Strict mode
    if (saActive && dpActive && smpcActive) {
      bioProtected = true;
      medicalProtected = true;
      personalProtected = true;
    }

    setDataAnonymizationStatus({
      biometricData: bioProtected,
      medicalRecords: medicalProtected,
      personalInfo: personalProtected
    });
  };

  // Fetch privacy status details
  const fetchPrivacyStatusDetails = async () => {
    try {
      const response = await fetch('/api/privacy/status-details');
      if (response.ok) {
        const data = await response.json();

        setEncryptionStatus({
          active: data.dataEncryption.active,
          type: data.dataEncryption.type,
          lastVerified: data.dataEncryption.lastVerified
        });

        setPrivacyCompliance({
          status: data.privacyCompliance.status,
          percentage: data.privacyCompliance.percentage,
          profile: data.privacyCompliance.profile,
          dpScore: data.privacyCompliance.dpScore
        });

        setAccessControls({
          configured: data.accessControls.configured,
          type: data.accessControls.type
        });

        // Update UI sliders based on the profile
        if (data.privacyCompliance.profile === 'Basic') {
          setNoiseLevel(30);
          setEpsilonValue(1.0);
          setClippingThreshold(50);
        } else if (data.privacyCompliance.profile === 'Balanced') {
          setNoiseLevel(60);
          setEpsilonValue(0.75);
          setClippingThreshold(80);
        } else if (data.privacyCompliance.profile === 'Strict') {
          setNoiseLevel(90);
          setEpsilonValue(0.5);
          setClippingThreshold(90);
        }
      }
    } catch (error) {
      console.error('Error fetching privacy status:', error);
      // Fallback to default values if API fails
      updatePrivacyProfile(noiseLevel, epsilonValue, clippingThreshold);
    }
  };

  // Fetch data anonymization status
  const fetchDataAnonymizationStatus = async () => {
    try {
      const response = await fetch('/api/privacy/sensitive-data');
      if (response.ok) {
        const data = await response.json();

        setDataAnonymizationStatus({
          biometricData: data.biometricData.protected,
          medicalRecords: data.medicalRecords.protected,
          personalInfo: data.personalInfo.protected
        });
      }
    } catch (error) {
      console.error('Error fetching data anonymization status:', error);
      // Use calculated status as fallback
      updateDataAnonymizationStatus(
        privacyCompliance.profile,
        privacyCompliance.status
      );
    }
  };

  // Trigger privacy check
  const runPrivacyCheck = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/privacy/run-check', { method: 'POST' });
      if (response.ok) {
        // Refresh all privacy data
        await fetchPrivacyStatusDetails();
        await fetchDataAnonymizationStatus();
      }
    } catch (error) {
      console.error('Error running privacy check:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchPrivacyStatusDetails(),
      fetchDataAnonymizationStatus()
    ])
      .finally(() => setIsLoading(false));
  }, []);

  // If initial data not yet loaded, use calculated values
  useEffect(() => {
    if (!isLoading) {
      updatePrivacyProfile(noiseLevel, epsilonValue, clippingThreshold);
    }
  }, [isLoading]);

  return (
    <div style={{ backgroundColor: 'var(--color-grayLight)' }} className="min-h-screen p-6">
      <div className="p-2 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Data Encryption"
            value={encryptionStatus.type || "256-bit"}
            subtitle={encryptionStatus.active ? "Active" : "Inactive"}
            icon={<Lock size={24} />}
            iconColor={encryptionStatus.active ? "text-green-500" : "text-red-500"}
          />

          <StatCard
            title="Privacy Compliance"
            value={`${privacyCompliance.percentage}%`}
            subtitle={privacyCompliance.status ? "HIPAA Compliant" : "Non-Compliant"}
            icon={<ClipboardCheck size={24} />}
            iconColor={privacyCompliance.status ? "text-blue-600" : "text-red-500"}
          />

          <StatCard
            title="Data Anonymization"
            value={dataAnonymizationStatus.biometricData && dataAnonymizationStatus.medicalRecords && dataAnonymizationStatus.personalInfo ? "100%" : dataAnonymizationStatus.biometricData && dataAnonymizationStatus.medicalRecords ? "66%" : dataAnonymizationStatus.biometricData ? "33%" : "0%"}
            subtitle={dataAnonymizationStatus.biometricData && dataAnonymizationStatus.medicalRecords && dataAnonymizationStatus.personalInfo ? "Fully Protected" : dataAnonymizationStatus.biometricData && dataAnonymizationStatus.medicalRecords ? "Partially Protected" : dataAnonymizationStatus.biometricData ? "Minimally Protected" : "Not Protected"}
            icon={<Shield size={24} />}
            iconColor={dataAnonymizationStatus.biometricData && dataAnonymizationStatus.medicalRecords && dataAnonymizationStatus.personalInfo ? "text-green-500" : dataAnonymizationStatus.biometricData ? "text-yellow-500" : "text-red-500"}
          />

          <StatCard
            title="Access Control"
            value={accessControls.type || "Multi-Factor"}
            subtitle={accessControls.configured ? "Enhanced Security" : "Not Configured"}
            icon={<Lock size={24} />}
            iconColor={accessControls.configured ? "text-blue-600" : "text-red-500"}
          />
        </div>

        {/* Grid for Differential Privacy Settings and Privacy Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Differential Privacy Settings */}
          <div style={{ backgroundColor: 'var(--color-cardBg)' }} className="p-6 rounded-lg shadow-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Differential Privacy Settings</h2>

            <div className="flex mb-4">
              <button
                className={`px-4 py-1 mr-2 rounded-md ${
                  activeTab === 'Basic'
                    ? 'bg-textBlue text-white'
                    : 'bg-grayBg text-grayMedium'
                }`}
                onClick={() => setActiveTab('Basic')}
                style={
                  activeTab === 'Basic'
                    ? { backgroundColor: 'var(--color-textBlue)', color: 'white' }
                    : { backgroundColor: 'var(--color-grayBg)', color: 'var(--color-grayMedium)' }
                }
              >
                Basic
              </button>
              <button
                className={`px-4 py-1 rounded-md ${
                  activeTab === 'Advanced'
                    ? 'bg-textBlue text-white'
                    : 'bg-grayBg text-grayMedium'
                }`}
                onClick={() => setActiveTab('Advanced')}
                style={
                  activeTab === 'Advanced'
                    ? { backgroundColor: 'var(--color-textBlue)', color: 'white' }
                    : { backgroundColor: 'var(--color-grayBg)', color: 'var(--color-grayMedium)' }
                }
              >
                Advanced
              </button>
            </div>

            <SliderControl
              label="Noise Level"
              value={noiseLevel}
              onChange={(val) => {
                setNoiseLevel(val);
                updatePrivacyProfile(val, epsilonValue, clippingThreshold);
              }}
              formatValue={(val) => `${val}%`}
            />

            <SliderControl
              label="Epsilon Value"
              value={epsilonValue}
              onChange={(val) => {
                setEpsilonValue(val);
                updatePrivacyProfile(noiseLevel, val, clippingThreshold);
              }}
              min={0}
              max={1}
              formatValue={(val) => val.toFixed(2)}
            />

            <SliderControl
              label="Clipping Threshold"
              value={clippingThreshold}
              onChange={(val) => {
                setClippingThreshold(val);
                updatePrivacyProfile(noiseLevel, epsilonValue, val);
              }}
              formatValue={(val) => `${val}%`}
              className="mb-2"
            />

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={runPrivacyCheck}
                disabled={refreshing}
              >
                {refreshing ? 'Running Check...' : 'Run Privacy Check'}
              </button>
            </div>
          </div>

          {/* Privacy Status */}
          <div style={{ backgroundColor: 'var(--color-cardBg)' }} className="p-6 rounded-lg shadow-sm border border-blue-200 md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Status</h2>

            <div className="space-y-6">
              <StatusItem
                title="Data Encryption Active"
                description={`Last verified: ${encryptionStatus.lastVerified}`}
                status={encryptionStatus.active}
              />

              <StatusItem
                title="HIPAA Compliance"
                description={privacyCompliance.status ? `All checks passed (DP Score: ${privacyCompliance.dpScore.toFixed(2)})` : 'Some checks failed'}
                status={privacyCompliance.status}
              />

              <StatusItem
                title="Access Controls"
                description={accessControls.configured ? "Properly configured" : "Not fully configured"}
                status={accessControls.configured}
              />
            </div>
          </div>
        </div>

        {/* Sensitive Data Protection with same width as Differential Privacy Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div style={{ backgroundColor: 'var(--color-cardBg)' }} className="p-6 rounded-lg shadow-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensitive Data Protection</h2>

            <div className="space-y-6">
              <DataProtectionItem
                icon={<Fingerprint size={24} />}
                title="Biometric Data"
                description={dataAnonymizationStatus.biometricData ? "256-bit encrypted, anonymized" : "Not protected"}
                iconColor={dataAnonymizationStatus.biometricData ? "text-purple-500" : "text-red-500"}
                status={dataAnonymizationStatus.biometricData}
              />

              <DataProtectionItem
                icon={<FileText size={24} />}
                title="Medical Records"
                description={dataAnonymizationStatus.medicalRecords ? "End-to-end encryption" : "Not protected"}
                iconColor={dataAnonymizationStatus.medicalRecords ? "text-blue-500" : "text-red-500"}
                status={dataAnonymizationStatus.medicalRecords}
              />

              <DataProtectionItem
                icon={<User size={24} />}
                title="Personal Information"
                description={dataAnonymizationStatus.personalInfo ? "Tokenized and encrypted" : "Not protected"}
                iconColor={dataAnonymizationStatus.personalInfo ? "text-purple-500" : "text-red-500"}
                status={dataAnonymizationStatus.personalInfo}
              />
            </div>
          </div>
          <div className="md:col-span-1">

          </div>
        </div>
      </div>
    </div>
  );
}