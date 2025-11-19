import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";

export default function LandingPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("Karibu MyChanjo! ");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Afya yako, chanjo zako, kwa urahisi. ");
    }, 3000);

   
    return () => clearTimeout(timer);
  }, []); 
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center rounded-3xl border-x-4 border-y-4 border-[#A0E7E5]"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #e6f0ff, #f2e6ff)", 
      }}
    >
      <div className="bg-white/80 p-10 rounded-2xl shadow-lg max-w-md">
        <H as="h1" className="text-5xl font-bold mb-4 text-[#0b2545]">
          MyChanjo
        </H>

       
        <P className="text-lg mb-8 text-[#0b2545]">
          {message}
        </P>

        <div className="flex justify-center gap-6">
          <Button onClick={() => navigate("/register")}>Jisajili</Button>
          <Button onClick={() => navigate("/login")}>Ingia</Button>
        </div>
      </div>
    </div>
  );
}
