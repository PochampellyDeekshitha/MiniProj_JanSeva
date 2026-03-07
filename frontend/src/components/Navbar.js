import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/dashboard.css";

function Navbar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const phoneNumber = "+91 ****** 1234";

  const [showDropdown, setShowDropdown] = useState(false);

  // get saved language or default to English
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  // Map display name to language code
  const languages = [
    { name: "English", code: "en" },
    { name: "Hindi", code: "hi" },
    { name: "Telugu", code: "te" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode); // change app language
    setSelectedLanguage(langCode); // update state
    localStorage.setItem("selectedLanguage", langCode); // persist selection
    setShowDropdown(false); // close dropdown
  };

  // Display the selected language's name in the header
  const selectedLanguageName =
    languages.find((l) => l.code === selectedLanguage)?.name || "English";

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
            {selectedLanguageName} ▼
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.name}
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