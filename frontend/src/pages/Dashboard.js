import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <-- import translation hook
import Navbar from "../components/Navbar";
import "../css/dashboard.css";
import FAQItem from "../components/FAQItem";

// Optional: Language selector component inside Dashboard
function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <div className="language-selector">
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("hi")}>हिंदी</button>
      <button onClick={() => changeLanguage("te")}>తెలుగు</button>
    </div>
  );
}

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />
   {/*     <LanguageSelector />   <-- Add language switcher */}

      {/* --- Welcome Section --- */}
      <section className="welcome-section">
        <h1>{t("welcomeMessage")}</h1>
        <p>{t("assistMessage")}</p>

        <div className="search-box">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
          />
          <span className="mic-icon">🎤</span>
        </div>
      </section>

      {/* --- Category Section --- */}
      <section className="category-section">
        <div className="category-card" onClick={() => navigate("/legal")}>⚖ {t("legal")}</div>
        <div className="category-card" onClick={() => navigate("/healthcare")}>🏥 {t("healthcare")}</div>
        <div className="category-card" onClick={() => navigate("/education")}>🎓 {t("education")}</div>
        <div className="category-card" onClick={() => navigate("/farmer")}>🌾 {t("farmer")}</div>
        <div className="category-card" onClick={() => navigate("/senior")}>♿ {t("senior")}</div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="how-it-works">
        <div className="container">
          <h2>{t("howItWorksTitle")}</h2>
          <p>{t("howItWorksDesc")}</p>

          <div className="steps">
            <div className="step-card">
              <div className="step-icon">📝</div>
              <h3>{t("step1Title")}</h3>
              <p>{t("step1Desc")}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🤖</div>
              <h3>{t("step2Title")}</h3>
              <p>{t("step2Desc")}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">✅</div>
              <h3>{t("step3Title")}</h3>
              <p>{t("step3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQs Section --- */}
      <section className="faq-section">
        <div className="container">
          <h2>{t("faqTitle")}</h2>
          <p>{t("faqDesc")}</p>

          <div className="faq-items">
            <FAQItem 
              question={t("faq1Question")} 
              answer={t("faq1Answer")} 
            />
            <FAQItem 
              question={t("faq2Question")} 
              answer={t("faq2Answer")} 
            />
            <FAQItem 
              question={t("faq3Question")} 
              answer={t("faq3Answer")} 
            />
            <FAQItem 
              question={t("faq4Question")} 
              answer={t("faq4Answer")} 
            />
            <FAQItem 
              question={t("faq5Question")} 
              answer={t("faq5Answer")} 
            />
          </div>

          <p className="view-all" onClick={() => navigate("/faq")}>
            {t("viewAllFaqs")} →
          </p>
        </div>
      </section>

      <footer className="dashboard-footer">
        {t("footerEmail")} | {t("footerHelpline")}
      </footer>
    </div>
  );
}

export default Dashboard;