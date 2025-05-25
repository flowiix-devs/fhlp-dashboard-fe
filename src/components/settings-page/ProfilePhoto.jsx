const ProfilePhoto = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          Change Photo
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProfilePhoto;