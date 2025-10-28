import React from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";

export default function AnotherChild() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #e6f0ff, #f2e6ff)", // same baby blue & lilac gradient
      }}
    >
      <div className="bg-white/80 p-10 rounded-2xl shadow-lg max-w-md">
        <H as="h1" className="text-4xl font-bold mb-4 text-[#0b2545]">
          Ongeza Mtoto Mwingine 👶
        </H>

        <P className="text-lg mb-8 text-[#0b2545]">
          Tafadhali ongeza taarifa za mtoto mwingine ili kufuatilia chanjo zake
          kwa urahisi. 💙
        </P>

        <div className="flex justify-center gap-6">
          <Button onClick={() => navigate("/add-baby")}>Ongeza Mtoto</Button>
          <Button onClick={() => navigate("/dashboard")}>Rudi Kwenye Chanjo</Button>
        </div>
      </div>
    </div>
  );
}
// This component allows users to navigate to add another child or return to the dashboard.