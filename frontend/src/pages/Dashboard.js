import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";
import FAQItem from "../components/FAQItem";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />

      <section className="welcome-section">
        <h1>Welcome, Citizen!</h1>
        <p>How can we assist you today?</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Ask about pension, legal case, scholarship..."
          />
          <span className="mic-icon">🎤</span>
        </div>
      </section>

      <section className="category-section">
        <div className="category-card" onClick={() => navigate("/legal")}>⚖ Legal</div>
        <div className="category-card" onClick={() => navigate("/healthcare")}>🏥 Healthcare</div>
        <div className="category-card" onClick={() => navigate("/education")}>🎓 Education</div>
        <div className="category-card" onClick={() => navigate("/farmer")}>🌾 Farmer</div>
        <div className="category-card" onClick={() => navigate("/senior")}>♿ Senior</div>
      </section>

{/* --- How It Works Section --- */}
<section className="how-it-works">
  <div className="container">
    <h2>How Legal Assistance Works</h2>
    <p>No appointments or waiting rooms—get guidance anytime, anywhere.</p>

    <div className="steps">
      <div className="step-card">
        <div className="step-icon">📝</div>
        <h3>Step 1: Ask Your Question</h3>
        <p>Type or speak your legal query in simple language. No complex legal terms required.</p>
      </div>
      <div className="step-card">
        <div className="step-icon">🤖</div>
        <h3>Step 2: AI Analysis</h3>
        <p>Our AI evaluates your query against Indian laws, regulations, and precedents.</p>
      </div>
      <div className="step-card">
        <div className="step-icon">✅</div>
        <h3>Step 3: Get Guidance</h3>
        <p>Receive actionable advice that helps you understand your legal options clearly.</p>
      </div>
    </div>
  </div>
</section>

{/* --- FAQs Section --- */}
<section className="faq-section">
  <div className="container">
    <h2>Frequently Asked Questions</h2>
    <p>Have questions about JanSeva services? Click a question to view the answer.</p>

    <div className="faq-items">
      <FAQItem 
        question="Is JanSeva free for all citizens?" 
        answer="Yes! Most services provided on JanSeva are free for Indian citizens." 
      />
      <FAQItem 
        question="Do I need to create an account to use JanSeva?" 
        answer="Some features require signing in, but general information and search are accessible without an account." 
      />
      <FAQItem 
        question="Which services can I access through JanSeva?" 
        answer="You can access legal guidance, healthcare information, education support, farmer schemes, and senior citizen aid." 
      />
      <FAQItem 
        question="Is the AI assistant a substitute for legal or medical professionals?" 
        answer="No. The AI provides guidance and information but is not a replacement for professional legal, medical, or government advice." 
      />
      <FAQItem 
        question="How can I report an issue or provide feedback?" 
        answer="Use the Contact or Help section on JanSeva to submit your queries or feedback." 
      />
    </div>

    <p className="view-all" onClick={() => navigate("/faq")}>View all FAQs →</p>
    
  </div>
</section>

      <footer className="dashboard-footer">
        Email: support@janseva.in | Helpline: 1800-XXX-XXXX
      </footer>
    </div>
  );
}

export default Dashboard;