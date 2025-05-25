const StorageUsage = () => {
  const usedStorage = 65.2;
  const totalStorage = 100;
  const usagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Storage Usage</h2>
      
      <div className="space-y-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{usedStorage} GB used</span>
          <span>{totalStorage} GB total</span>
        </div>
        
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Manage Storage
        </button>
      </div>
    </div>
  );
};

export default StorageUsage;