import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AnaSayfa from "./Pages/AnaSayfa";
import RandevuFormu from "./Pages/RandevuFormu";
import CalisanListesi from "./Pages/CalisanListesi";
import AdminPanel from "./Pages/AdminPanel";
import RandevuListesi from "./Pages/RandevuListesi";
import HizmetYonetimi from "./Pages/HizmetYonetimi";
import GunlukKarDashboard from "./Pages/GunlukKarDashboard";
import YorumFormu from "./Pages/YorumFormu";
import YorumYapSayfasi from "./Pages/YorumYapSayfasi";
import YorumlariGoruntule from "./Pages/YorumlariGoruntule";
import AdminLogin from "./Pages/AdminLogin";

// Protected Route Component
function ProtectedRoute({ children }) {
  const roller = JSON.parse(localStorage.getItem('roller') || '[]');
  
  const hasAdminAccess = roller.some(rol => 
    rol === 'ROLE_ADMIN' || rol === 'ROLE_CALISAN'
  );
  
  if (!hasAdminAccess) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/RandevuFormu" element={<RandevuFormu />} />
        <Route path="/CalisanListesi" element={<CalisanListesi />} />
        <Route path="/YorumYapSayfasi" element={<YorumYapSayfasi />} />
        <Route path="/YorumlariGoruntule" element={<YorumlariGoruntule />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Routes */}
        <Route 
          path="/AdminPanel" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/RandevuListesi" 
          element={
            <ProtectedRoute>
              <RandevuListesi />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/HizmetYonetimi" 
          element={
            <ProtectedRoute>
              <HizmetYonetimi />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/GunlukKarDashboard" 
          element={
            <ProtectedRoute>
              <GunlukKarDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/YorumFormu" 
          element={
            <ProtectedRoute>
              <YorumFormu />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;