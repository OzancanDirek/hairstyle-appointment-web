import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnaSayfa from "./Pages/AnaSayfa";
import RandevuFormu from "./Pages/RandevuFormu";
import CalisanListesi from "./Pages/CalisanListesi";
import AdminPanel from "./Pages/AdminPanel";
import RandevuListesi from "./Pages/RandevuListesi";
import HizmetYonetimi from "./Pages/HizmetYonetimi";


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
      </Routes>
    </Router>
  );
}

export default App;
