import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import LanguageSelect from "../pages/LanguageSelect";
import Dashboard from "../pages/Dashboard";
import Legal from "../pages/Legal";
import Healthcare from "../pages/Healthcare";
import Education from "../pages/Education";
import Farmer from "../pages/Farmer";
import Senior from "../pages/Senior";
import FAQPage from "../pages/FAQPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/language" element={<LanguageSelect />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/education" element={<Education />} />
      <Route path="/farmer" element={<Farmer />} />
      <Route path="/senior" element={<Senior />} />
      <Route path="/faq" element={<FAQPage />} />
    </Routes>
  );
}

export default AppRoutes;