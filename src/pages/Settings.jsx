import React, { useState } from 'react';
import ProfileSettings from '../components/settings-page/ProfileSettings';
import SystemSettings from '../components/settings-page/SystemSettings';
import StorageUsage from '../components/settings-page/StorageUsage';
import ConnectedDevices from '../components/settings-page/ConnectedDevices';
import { useAuth } from '../context/AuthContext';


const Settings = () => {

  const { user } = useAuth();
  console.log('user in settings page', user);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 123-4567'
  });

  const [systemSettings, setSystemSettings] = useState({
    automaticUpdates: true,
    dataBackup: true,
    analytics: false
  });

  return (
    <div className="min-h-screen bg-grayLight p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileSettings formData={formData} setFormData={setFormData} />
            <SystemSettings settings={systemSettings} setSettings={setSystemSettings} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <StorageUsage />
            <ConnectedDevices />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;