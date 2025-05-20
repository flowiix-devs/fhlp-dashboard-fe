import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../src/components/Sidebar';
import Header from '../src/components/Header';
import PatientDashboard from '../src/pages/PatientDashboard';
import SystemHealth from '../src/pages/SystemHealth';
import AttackMonitoring from '../src/pages/AttackMonitoring';
import PrivecyProtection from '../src/pages/PrivecyProtection';
import ModelEveluation from '../src/pages/ModelEveluation';
import Settings from '../src/pages/Settings';
import { useSidebar } from '../src/context/SidebarContext';

const AppRoute = () => {
  const { isCollapsed } = useSidebar();
  const [pageTitle, setPageTitle] = useState("Welcome to Your Dashboard");
  const location = useLocation();
  
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
    const title = routeTitles[path] || "Welcome to Your Dashboard";
    setPageTitle(title);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className={`flex-1  transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header title={pageTitle} />
        
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
