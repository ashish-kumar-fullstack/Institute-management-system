import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Public/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/InatituteAdmin/AdminDashboard.jsx";
import StudentsPage from "./pages/InatituteAdmin/StudentsPage.jsx";
import TeachersPage from "./pages/InatituteAdmin/TeachersPage.jsx";
import CoursesPage from "./pages/InatituteAdmin/CoursesPage.jsx";
import AttendancePage from "./pages/InatituteAdmin/AttendancePage.jsx";
import FeesPage from "./pages/InatituteAdmin/FeesPage.jsx";
import SettingsPage from "./pages/InatituteAdmin/SettingsPage.jsx";
import DashboardLayout from "./components/Layout/DashboardLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";



import { useAuth } from "./Context/AuthContext.jsx";
const App = () => {

  const {user} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        {/* protectedRoute  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
