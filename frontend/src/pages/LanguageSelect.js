import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/language.css";

function LanguageSelect() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  // Map language codes to display names
  const languageNames = {
    en: "English",
    hi: "Hindi",
    te: "Telugu",
  };

  // 🔐 Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  // ✅ Handles select changes
  const handleLanguageSelect = (event) => {
    setLanguage(event.target.value);
  };

  const handleContinue = () => {
    if (!language) {
      alert("Please select a language");
      return;
    }

    try {
      i18n.changeLanguage(language); // change app language
      localStorage.setItem("language", language); // store selection
      console.log("Selected Language:", language);

      // Show full language name in alert
      alert(`Language Selected: ${languageNames[language]}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Language change failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="language-container">
      <div className="language-card">
        <h2>Select Your Language</h2>

        <div className="dropdown-wrapper">
          <select value={language} onChange={handleLanguageSelect}>
            <option value="">-- Select Language --</option>
            <option value="en">English</option>
            <option value="hi">Hindi (हिंदी)</option>
            <option value="te">Telugu (తెలుగు)</option>
          </select>
        </div>

        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}

export default LanguageSelect;