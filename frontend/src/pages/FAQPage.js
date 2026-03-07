import React from "react";
import Navbar from "../components/Navbar";
import FAQItem from "../components/FAQItem";
import { useTranslation } from "react-i18next";

function FAQPage() {

const { t } = useTranslation();

const faqData = [
  { question: t("faqPage.faq1Question"), answer: t("faqPage.faq1Answer") },
  { question: t("faqPage.faq2Question"), answer: t("faqPage.faq2Answer") },
  { question: t("faqPage.faq3Question"), answer: t("faqPage.faq3Answer") },
  { question: t("faqPage.faq4Question"), answer: t("faqPage.faq4Answer") },
  { question: t("faqPage.faq5Question"), answer: t("faqPage.faq5Answer") },
  { question: t("faqPage.faq6Question"), answer: t("faqPage.faq6Answer") },
  { question: t("faqPage.faq7Question"), answer: t("faqPage.faq7Answer") },
  { question: t("faqPage.faq8Question"), answer: t("faqPage.faq8Answer") },
  { question: t("faqPage.faq9Question"), answer: t("faqPage.faq9Answer") },
  { question: t("faqPage.faq10Question"), answer: t("faqPage.faq10Answer") }
];

  return (
    <div className="faq-page">
      <Navbar />
      <div className="container" style={{ padding: "60px 20px" }}>
        <h1>{t("faqPage.title")}</h1>

        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}

      </div>
    </div>
  );
}

export default FAQPage;