import ToggleSwitch from "./ToggleSwitch";

const SystemSettings = ({ settings, setSettings }) => {
  const handleToggle = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const settingsItems = [
    {
      key: 'automaticUpdates',
      title: 'Automatic Updates',
      description: 'Keep the system up to date automatically'
    },
    {
      key: 'dataBackup',
      title: 'Data Backup',
      description: 'Automatic daily backup of system data'
    },
    {
      key: 'analytics',
      title: 'Analytics',
      description: 'Share anonymous usage data'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
      
      <div className="space-y-6">
        {settingsItems.map((item) => (
          <div key={item.key} className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
            <ToggleSwitch
              enabled={settings[item.key]}
              onToggle={() => handleToggle(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSettings;