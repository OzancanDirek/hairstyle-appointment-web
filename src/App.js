import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/RandevuFormu" element={<RandevuFormu />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/CalisanListesi" element={<CalisanListesi />} />
        <Route path="/RandevuListesi" element={<RandevuListesi />} />
        <Route path="/HizmetYonetimi" element={<HizmetYonetimi />} />
        <Route path="/GunlukKarDashboard" element={<GunlukKarDashboard />} />
        <Route path="/YorumFormu" element={<YorumFormu />} />
        <Route path="/YorumYapSayfasi" element={<YorumYapSayfasi />} />
        <Route path="YOrumlariGoruntule" element={<YorumlariGoruntule />} />


      </Routes>
    </Router>
  );
}

export default App;
