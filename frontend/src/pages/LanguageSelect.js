import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/language.css";

function LanguageSelect() {
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  // 🔐 Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleContinue = () => {
    if (language === "") {
      alert("Please select a language");
      return;
    }

    localStorage.setItem("language", language);

    console.log("Selected Language:", language);

    alert("Language Selected: " + language);

    navigate("/dashboard");
  };

  return (
    <div className="language-container">
      <div className="language-card">
        <h2>Select Your Language</h2>

        <div className="dropdown-wrapper">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">-- Select Language --</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
          </select>
        </div>

        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}

export default LanguageSelect;