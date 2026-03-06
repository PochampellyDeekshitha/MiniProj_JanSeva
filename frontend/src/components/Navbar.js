import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";

function Navbar() {
  const navigate = useNavigate();

  const phoneNumber = "+91 ****** 1234";

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Marathi",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Gujarati",
    "Punjabi"
  ];

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
    setShowDropdown(false);
  };

  return (
    <div className="dashboard-header">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        JanSeva AI
      </div>

      <div className="header-right">
        <div className="language-dropdown">
          <div onClick={() => setShowDropdown(!showDropdown)}>
            {selectedLanguage} ▼
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user">👤 {phoneNumber}</div>
      </div>
    </div>
  );
}

export default Navbar;