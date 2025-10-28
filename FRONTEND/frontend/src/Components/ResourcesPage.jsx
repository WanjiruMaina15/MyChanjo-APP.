import React, { useEffect, useState } from "react";
import { H, P } from "./ReusableComponents/Typography";
import Card from "./ReusableComponents/Cards";
import Button from "./ReusableComponents/Buttons";

const Resources = () => {
  const [tips, setTips] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeSection, setActiveSection] = useState("tips"); // switch between "tips" or "faqs"

  // Fetch both tips and FAQs when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipsRes, faqsRes] = await Promise.all([
          fetch("http://localhost:5000/api/resources/tips"),
          fetch("http://localhost:5000/api/resources/faqs"),
        ]);

        const tipsData = await tipsRes.json();
        const faqsData = await faqsRes.json();

        setTips(tipsData);
        setFaqs(faqsData);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <H text="Baby Care Resources" />
        <div className="space-x-2">
          <Button
            text="Baby Care Tips"
            onClick={() => setActiveSection("tips")}
            className={activeSection === "tips" ? "bg-blue-600 text-white" : ""}
          />
          <Button
            text="FAQs"
            onClick={() => setActiveSection("faqs")}
            className={activeSection === "faqs" ? "bg-blue-600 text-white" : ""}
          />
        </div>
      </div>

      {/* Tips Section */}
      {activeSection === "tips" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition">
              <P text={`${index + 1}. ${tip}`} />
            </Card>
          ))}
        </div>
      )}

      {/* FAQs Section */}
      {activeSection === "faqs" && (
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-blue-700">
                Q{index + 1}: {item.question}
              </h3>
              <p className="text-gray-700 mt-1">{item.answer}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
// This component displays a resources page with tips and FAQs for baby care.