import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";

export default function LandingPage() {
  const navigate = useNavigate();

  // ✅ Step 1: Add state
  const [message, setMessage] = useState("Karibu MyChanjo! 💙");

  // ✅ Step 2: Use useEffect to update message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Afya yako, chanjo zako, kwa urahisi. 💜");
    }, 3000);

    // cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []); // runs once on page load

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#e6f0ff] text-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #e6f0ff, #f2e6ff)", // soft baby blue & lilac gradient
      }}
    >
      <div className="bg-white/80 p-10 rounded-2xl shadow-lg max-w-md">
        <H as="h1" className="text-5xl font-bold mb-4 text-[#0b2545]">
          MyChanjo
        </H>

        {/* ✅ Dynamic message */}
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
