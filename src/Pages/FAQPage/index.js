import React from "react";
import { FAQAccordion } from "../../Components/FAQAccordion/";
import { accordionData } from "../../utils/content";

export const FAQPage = () => {
  return (
    <div>
      <h1>FAQ</h1>
      <div className="accordion">
        {accordionData.map(({ title, content }) => (
          <FAQAccordion title={title} content={content} />
        ))}
      </div>
    </div>
  );
};
