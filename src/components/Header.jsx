import { Bell, User, HelpCircle, LogOut } from 'lucide-react'; // Added LogOut icon
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = ({ title = "Welcome to Your Dashboard", pageContent = null }) => {
  const { user, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="bg-cardBg p-5 shadow-sm ml-0 mr-0 mt-0 mb-5 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-textBlack">{title}</h1>
      
      <div className="flex items-center gap-4">
        {pageContent ? (
          pageContent
        ) : (
          <button className="flex items-center gap-1 bg-lightGreen text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
            <span>New Patient Analysis</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
            <User size={18} className="text-white" />
          </div>
          {/* Display user's name if available, otherwise fallback */}
          <span className="font-medium text-textBlack">
            {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
          </span>
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <HelpCircle size={20} />
        </button>
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Logout"
        >
          <LogOut size={20} style={{ color: 'var(--color-textRed)' }} />
        </button>
      </div>
    </div>
  );
};

export default Header;
