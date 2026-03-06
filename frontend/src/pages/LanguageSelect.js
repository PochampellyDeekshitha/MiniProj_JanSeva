import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/language.css";

function LanguageSelect() {
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (language === "") {
      alert("Please select a language");
      return;
    }
    localStorage.setItem("language", language);
    // Later we can store in localStorage or backend
    console.log("selectedLanguage:", language);
    // For now just move forward (dashboard later)
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
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
            <option value="Malayalam">Malayalam (മലയാളം)</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="Bengali">Bengali (বাংলা)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
            <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
            <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
          </select>
        </div>

        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}

export default LanguageSelect;