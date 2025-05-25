import { MoreVertical, Laptop, Smartphone } from 'lucide-react';


// Connected Devices Component
const ConnectedDevices = () => {
  const devices = [
    {
      id: 1,
      name: 'MacBook Pro',
      lastActive: 'Now',
      icon: Laptop
    },
    {
      id: 2,
      name: 'iPhone 13',
      lastActive: '2h ago',
      icon: Smartphone
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Devices</h2>
      
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <device.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{device.name}</h3>
                <p className="text-sm text-gray-500">Last active: {device.lastActive}</p>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedDevices;