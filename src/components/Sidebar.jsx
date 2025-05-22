import { NavLink } from 'react-router-dom';
import { ChartLine, HeartPulse, Hospital, Menu, Settings, ShieldX, UserLock } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();

  
  const menuItems = [
    {
      path: '/patient-dashboard',
      name: 'Patient Dashboard',
      icon: <Hospital className="text-xl" />
    },
    // {
    //   path: '/system-health',
    //   name: 'System Health',
    //   icon: <HeartPulse className="text-xl" />
    // },
    {
      path: '/attack-monitoring',
      name: 'Attack Monitoring',
      icon: <ShieldX  className="text-xl" />
    },
    {
      path: '/privecy-protection',
      name: 'Privecy Protection',
      icon: <UserLock className="text-xl" />
    },
    // {
    //   path: '/model-evaluation',
    //   name: 'Model Evaluation',
    //   icon: <ChartLine className="text-xl" />
    // },
    {
      path: '/settings',
      name: 'Settings',
      icon: <Settings className="text-xl" />
    }
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-cardBg border-r border-gray-200 shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center">
          <img src='/logo.png' width="50px" height="50px"/>
          {!isCollapsed && 
          <div className="flex flex-col ml-3">
            <h2 className=" text-xl font-bold text-textBlack">
              FedHealth
            </h2>
            <span className='text-textGray text-sm'>Learning Platform</span>
            </div>
          }
        </div>
        
      </div>
      
      <div className="py-5 flex flex-col h-[calc(100%-70px)]">
        {menuItems.map((item, index) => (
          <NavLink 
            to={item.path} 
            key={index}
            className={({ isActive }) => 
              `flex items-center py-3 px-5 text-textBlack transition-all duration-200 hover:bg-gray-50 hover:text-textBlue hover:border-l-4 hover:border-textBlue ${
                isActive ? 'bg-gray-50 text-textBlue border-l-4 border-textBlue font-semibold' : ''
              } my-1`
            }
          >
            <div className="min-w-[30px]">{item.icon}</div>
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
        
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center py-3 px-5 text-textBlack cursor-pointer transition-all duration-200 hover:bg-gray-50 mt-auto"
        >
          <div className="min-w-[30px]"><Menu className="text-xl" /></div>
          {!isCollapsed && <span className="ml-3">Collapse</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;