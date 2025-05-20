import { useState } from 'react';
import { Shield, Lock, ClipboardCheck, FileText, Fingerprint, User } from 'lucide-react';

export default function PrivacyProtection() {
  const [noiseLevel, setNoiseLevel] = useState(60);
  const [epsilonValue, setEpsilonValue] = useState(0.75);
  const [clippingThreshold, setClippingThreshold] = useState(80);
  const [activeTab, setActiveTab] = useState('Basic');

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-left mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Privacy Protection</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">Privacy Score:</span>
              <span className="text-green-500 font-medium">Excellent</span>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Run Privacy Check
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Data Encryption Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-2 text-gray-600 text-sm">Data Encryption</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">256-bit</div>
                <div className="text-green-500 text-xs">AES Standard</div>
              </div>
              <div className="text-green-500">
                <Lock size={24} />
              </div>
            </div>
          </div>

          {/* Privacy Compliance Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-2 text-gray-600 text-sm">Privacy Compliance</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">98%</div>
                <div className="text-green-500 text-xs">HIPAA Compliant</div>
              </div>
              <div className="text-blue-600">
                <ClipboardCheck size={24} />
              </div>
            </div>
          </div>

          {/* Data Anonymization Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-2 text-gray-600 text-sm">Data Anonymization</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">100%</div>
                <div className="text-green-500 text-xs">Fully Protected</div>
              </div>
              <div className="text-green-500">
                <Shield size={24} />
              </div>
            </div>
          </div>

          {/* Access Control Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-2 text-gray-600 text-sm">Access Control</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">Multi-Factor</div>
                <div className="text-green-500 text-xs">Enhanced Security</div>
              </div>
              <div className="text-blue-600">
                <Lock size={24} />
              </div>
            </div>
          </div>
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
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Noise Level</span>
                <span className="text-gray-500">{noiseLevel}%</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-2 bg-blue-600 rounded-full"
                  style={{ width: `${noiseLevel}%` }}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2 cursor-pointer"
                  style={{ left: `${noiseLevel}%` }}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Epsilon Value</span>
                <span className="text-gray-500">{epsilonValue}</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-2 bg-blue-600 rounded-full"
                  style={{ width: `${epsilonValue * 100}%` }}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2 cursor-pointer"
                  style={{ left: `${epsilonValue * 100}%` }}
                />
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Clipping Threshold</span>
                <span className="text-gray-500">{clippingThreshold}%</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-2 bg-blue-600 rounded-full"
                  style={{ width: `${clippingThreshold}%` }}
                />
                <div
                  className="absolute w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2 cursor-pointer"
                  style={{ left: `${clippingThreshold}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Privacy Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200 md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Status</h2>
            
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-green-100 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 text-green-500 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Data Encryption Active</div>
                    <div className="text-gray-500 text-sm">Last verified: 5 min ago</div>
                  </div>
                </div>
              </div>
              
                 <div className="flex items-center p-4 bg-green-100 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 text-green-500 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">HIPAA Compliance</div>
                    <div className="text-gray-500 text-sm">All checks passed</div>
                  </div>
                </div>
              </div>
              
                 <div className="flex items-center p-4 bg-green-100 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 text-green-500 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Access Controls</div>
                    <div className="text-gray-500 text-sm">Properly configured</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensitive Data Protection with same width as Differential Privacy Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensitive Data Protection</h2>
            
            <div className="space-y-6">
              {/* Biometric Data */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 text-purple-500">
                    <Fingerprint size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Biometric Data</div>
                    <div className="text-gray-500 text-sm">256-bit encrypted, anonymized</div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Protected
                </div>
              </div>
              
              {/* Medical Records */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 text-blue-500">
                    <FileText size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Medical Records</div>
                    <div className="text-gray-500 text-sm">End-to-end encryption</div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Protected
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 text-purple-500">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Personal Information</div>
                    <div className="text-gray-500 text-sm">Tokenized and encrypted</div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Protected
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            {/* Empty column to maintain layout consistency */}
          </div>
        </div>
      </div>
    </div>
  );
}