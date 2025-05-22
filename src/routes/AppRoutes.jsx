import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PatientDashboard from '../pages/PatientDashboard';
import SystemHealth from '../pages/SystemHealth';
import AttackMonitoring from '../pages/AttackMonitoring';
import PrivecyProtection from '../pages/PrivecyProtection';
import ModelEveluation from '../pages/ModelEveluation';
import Settings from '../pages/Settings';
import { useSidebar } from '../context/SidebarContext';

const AppRoute = () => {
  const { isCollapsed } = useSidebar();
  const [pageTitle, setPageTitle] = useState("Welcome to Your Dashboard");
  const [pageContent, setPageContent] = useState(null);
  const location = useLocation();
  
  // Define route titles and content
  const routeTitles = {
    '/patient-dashboard': 'Patient Dashboard',
    '/system-health': 'System Health',
    '/attack-monitoring': 'Attack Monitoring',
    '/privecy-protection': 'Privacy Protection',
    '/model-evaluation': 'Model Evaluation',
    '/settings': 'Settings',
  };
  
  useEffect(() => {
    const path = location.pathname;
    const title = routeTitles[path] || "Patient Dashboard";
    setPageTitle(title);
    
    // Set page-specific content based on route
    if (path === '/privecy-protection') {
      setPageContent(
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Privacy Score:</span>
            <span style={{ color: 'var(--color-lightGreen)' }} className="font-medium">Excellent</span>
          </div>
          <button style={{ 
            backgroundColor: 'var(--color-lightGreen)', 
            color: 'white' 
          }} className="px-4 py-2 rounded-md hover:opacity-90">
            Run Privacy Check
          </button>
        </div>
      );
    } else if (path === '/attack-monitoring') {
      setPageContent(
        <div className="flex items-center gap-6">
          <div className="text-gray-600">
            Threat Level: <span style={{ color: 'var(--color-lightGreen)' }} className="font-medium">Low</span>
          </div>
          <button style={{ 
            backgroundColor: 'var(--color-lightGreen)', 
            color: 'white' 
          }} className="px-4 py-2 rounded-md hover:opacity-90 transition">
            Scan Network
          </button>
        </div>
      );
    } else {
      setPageContent(null);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className={`flex-1  transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header title={pageTitle} pageContent={pageContent} />
        
        <div className='pl-5 pr-5'>
          <Routes>
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/system-health" element={<SystemHealth />} />
            <Route path="/attack-monitoring" element={<AttackMonitoring />} />
            <Route path="/privecy-protection" element={<PrivecyProtection />} />
            <Route path="/model-evaluation" element={<ModelEveluation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<PatientDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRoute;
