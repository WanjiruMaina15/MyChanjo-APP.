import React from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";

export default function LandingPage() {
  const navigate = useNavigate();

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

        <P className="text-lg mb-8 text-[#0b2545]">
          Afya yako, chanjo zako, kwa urahisi. 💙💜
        </P>

        <div className="flex justify-center gap-6">
          <Button onClick={() => navigate("/register")}>Jisajili</Button>
          <Button onClick={() => navigate("/login")}>Ingia</Button>
        </div>
      </div>
    </div>
  );
}
