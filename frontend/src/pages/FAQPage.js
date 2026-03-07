import React from "react";
import Navbar from "../components/Navbar";
import FAQItem from "../components/FAQItem";

function FAQPage() {
const faqData = [
  { 
    question: "Is JanSeva free for all citizens?", 
    answer: "Yes! Most services provided on JanSeva are free of charge for Indian citizens." 
  },
  { 
    question: "Do I need an account to use JanSeva?", 
    answer: "Some features, like tracking your queries or submitting requests, require signing in. General information and searches are accessible without an account." 
  },
  { 
    question: "Which services can I access through JanSeva?", 
    answer: "You can access services related to legal guidance, healthcare, education support, farmer schemes, senior citizen aid, and citizen grievance reporting." 
  },
  { 
    question: "How can I submit a complaint or feedback?", 
    answer: "Use the 'Help' or 'Contact' section to submit complaints, suggestions, or feedback. You will receive a reference number for tracking." 
  },
  { 
    question: "Can I track the status of my request or query?", 
    answer: "Yes. After logging in, you can track the status of all your submitted requests or queries from the dashboard." 
  },
  { 
    question: "Is my personal information secure?", 
    answer: "Yes. JanSeva uses secure encryption and follows strict privacy policies to protect all citizen data." 
  },
  { 
    question: "Which government schemes are covered in JanSeva?", 
    answer: "JanSeva provides information on central and state government schemes including health, education, agriculture, social welfare, and senior citizen benefits." 
  },
  { 
    question: "Is the AI assistant a substitute for a professional?", 
    answer: "No. The AI provides guidance and information, but it is not a replacement for professional legal, medical, or government advice." 
  },
  { 
    question: "Can I access JanSeva on mobile?", 
    answer: "Yes. JanSeva is mobile-friendly and works on all modern smartphones and tablets." 
  },
  { 
    question: "Who can benefit from JanSeva?", 
    answer: "All Indian citizens seeking information or guidance about government services, legal help, healthcare, education, or social welfare can benefit from JanSeva." 
  }
];

  return (
    <div className="faq-page">
      <Navbar />
      <div className="container" style={{ padding: "60px 20px" }}>
        <h1>All FAQs</h1>
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default FAQPage;