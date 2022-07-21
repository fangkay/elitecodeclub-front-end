import React, { useState } from "react";

export const FAQAccordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <h4>{isActive ? "-" : "+"}</h4>
        </div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};
