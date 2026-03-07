import React, { useState } from "react";
import "../css/faq.css"; 

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item" onClick={() => setIsOpen(!isOpen)}>
      <h4>{question}</h4>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
}

export default FAQItem;