import { Bell, User } from 'lucide-react';

const Header = ({ title = "Welcome to Your Dashboard" }) => {
  return (
    <div className="bg-cardBg p-5 shadow-sm ml-0 mr-0 mt-0 mb-5 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-textBlack">{title}</h1>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 bg-lightGreen text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
          <span>New Patient Analysis</span>
        </button> 
        <div className="flex items-center gap-2">
          <div className="bg-textBlue rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
            <User size={18} className="text-white" />
          </div>
          <span className="font-medium text-textBlack">John Doe</span>
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
