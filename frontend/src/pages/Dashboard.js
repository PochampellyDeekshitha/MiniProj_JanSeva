import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="welcome-section">
        <h2>Welcome, Citizen!</h2>
        <p>How can we assist you today?</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Ask about pension, legal case, scholarship..."
          />
          <span className="mic-icon">🎤</span>
        </div>
      </div>

      <div className="category-section">
        <div className="category-card" onClick={() => navigate("/legal")}>⚖ Legal</div>
        <div className="category-card" onClick={() => navigate("/healthcare")}>🏥 Healthcare</div>
        <div className="category-card" onClick={() => navigate("/education")}>🎓 Education</div>
        <div className="category-card" onClick={() => navigate("/farmer")}>🌾 Farmer</div>
        <div className="category-card" onClick={() => navigate("/senior")}>♿ Senior</div>
        <div className="category-card" onClick={() => navigate("/askai")}>🧠 Ask AI</div>
      </div>

      <div className="quick-help">
        <h3>Need Quick Help?</h3>
        <div className="quick-buttons">
          <button>🎤 Speak Now</button>
          <button>⌨ Type Question</button>
        </div>
      </div>

      <div className="dashboard-footer">
        Emergency Contacts | Privacy | About
      </div>

    </div>
  );
}

export default Dashboard;