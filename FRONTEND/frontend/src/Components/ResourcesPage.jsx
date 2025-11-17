import React, { useEffect, useState } from "react";
import { H, P } from "./ReusableComponents/Typography";
import Card from "./ReusableComponents/Cards";
import Button from "./ReusableComponents/Buttons";
import api from "../Apis/axios"; 
import Header from "./Header";

const Resources = () => {
  const [tips, setTips] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeSection, setActiveSection] = useState("tips");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch both tips and FAQs using Axios
        const [tipsRes, faqsRes] = await Promise.all([
          api.get("/resources/tips"),
          api.get("/resources/faqs"),
        ]);

        setTips(tipsRes.data);
        setFaqs(faqsRes.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Header />
      {/* Header and Section Toggles */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <H as="h2" className="text-2xl font-bold text-[#0b2545]">Baby Care Resources</H>
        <div className="space-x-2">
          <Button
            onClick={() => setActiveSection("tips")}
           
          >
            Baby Care Tips
          </Button>
          <Button
            onClick={() => setActiveSection("faqs")}
            
          >
            FAQs
          </Button>
        </div>
      </div>

      {/* Error Handling */}
      {error && <P className="text-red-500 text-center text-lg">{error}</P>}

      {/* Tips Section */}
      {activeSection === "tips" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.length > 0 ? (
            tips.map((tip, index) => (
              <Card key={index} className="p-4 bg-white border border-gray-200 hover:shadow-xl transition duration-300">
                <h3 className="font-semibold text-lg text-sky-800 mb-1">Tip #{index + 1}</h3>
                <P className="text-gray-700">{tip}</P>
              </Card>
            ))
          ) : (
            <div className="md:col-span-3 text-center p-8 bg-white rounded-lg shadow">
              <P className="text-gray-500">No baby care tips available yet. Check back soon!</P>
            </div>
          )}
        </div>
      )}

      {/* FAQs Section */}
      {activeSection === "faqs" && (
        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((item, index) => (
              <Card key={index} className="p-5 bg-white border border-gray-200 shadow hover:shadow-lg transition duration-300">
                <h3 className="font-bold text-xl text-indigo-700 mb-2">
                  Q{index + 1}: {item.question}
                </h3>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <P className="text-gray-500">No Frequently Asked Questions available yet.</P>
            </div>
          )}
        </div>
      )}
      <div>
        <Button
          onClick={() => window.history.back()}
          
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
export default Resources;