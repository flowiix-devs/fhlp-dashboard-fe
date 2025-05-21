import { useState } from 'react';
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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Data Encryption" 
            value="256-bit" 
            subtitle="AES Standard" 
            icon={<Lock size={24} />} 
            iconColor="text-green-500" 
          />
          
          <StatCard 
            title="Privacy Compliance" 
            value="98%" 
            subtitle="HIPAA Compliant" 
            icon={<ClipboardCheck size={24} />} 
            iconColor="text-blue-600" 
          />
          
          <StatCard 
            title="Data Anonymization" 
            value="100%" 
            subtitle="Fully Protected" 
            icon={<Shield size={24} />} 
            iconColor="text-green-500" 
          />
          
          <StatCard 
            title="Access Control" 
            value="Multi-Factor" 
            subtitle="Enhanced Security" 
            icon={<Lock size={24} />} 
            iconColor="text-blue-600" 
          />
        </div>

        {/* Grid for Differential Privacy Settings and Privacy Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Differential Privacy Settings */}
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Differential Privacy Settings</h2>
            
            <div className="flex mb-4">
              <button 
                className={`px-4 py-1 mr-2 rounded-md ${activeTab === 'Basic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('Basic')}
              >
                Basic
              </button>
              <button 
                className={`px-4 py-1 rounded-md ${activeTab === 'Advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('Advanced')}
              >
                Advanced
              </button>
            </div>
            
            <SliderControl 
              label="Noise Level"
              value={noiseLevel}
              onChange={setNoiseLevel}
              formatValue={(val) => `${val}%`}
            />
            
            <SliderControl 
              label="Epsilon Value"
              value={epsilonValue}
              onChange={setEpsilonValue}
              min={0}
              max={1}
              formatValue={(val) => val.toFixed(2)}
            />
            
            <SliderControl 
              label="Clipping Threshold"
              value={clippingThreshold}
              onChange={setClippingThreshold}
              formatValue={(val) => `${val}%`}
              className="mb-2"
            />
          </div>
          
          {/* Privacy Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200 md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Status</h2>
            
            <div className="space-y-6">
              <StatusItem 
                title="Data Encryption Active" 
                description="Last verified: 5 min ago" 
              />
              
              <StatusItem 
                title="HIPAA Compliance" 
                description="All checks passed" 
              />
              
              <StatusItem 
                title="Access Controls" 
                description="Properly configured" 
              />
            </div>
          </div>
        </div>

        {/* Sensitive Data Protection with same width as Differential Privacy Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensitive Data Protection</h2>
            
            <div className="space-y-6">
              <DataProtectionItem 
                icon={<Fingerprint size={24} />}
                title="Biometric Data"
                description="256-bit encrypted, anonymized"
                iconColor="text-purple-500"
              />
              
              <DataProtectionItem 
                icon={<FileText size={24} />}
                title="Medical Records"
                description="End-to-end encryption"
                iconColor="text-blue-500"
              />
              
              <DataProtectionItem 
                icon={<User size={24} />}
                title="Personal Information"
                description="Tokenized and encrypted"
                iconColor="text-purple-500"
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