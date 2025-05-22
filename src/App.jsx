import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRoute from "../routes/AppRoutes";
import { SidebarProvider } from "./context/SidebarContext";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/*" element={<AppRoute />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
