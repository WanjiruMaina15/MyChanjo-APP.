import React from "react";
import { H, P } from "./ReusableComponents/Typography"; 

export default function Header() {
  return (
    <header className="bg-[#00bcd4] text-white py-6 shadow-md">
      <div className="container mx-auto text-center">
        <H as="h1" className="text-3xl font-bold tracking-wide text-white">
          MyChanjo
        </H>
        <P className="text-lg mt-2 text-white tracking-wide leading-snug">
          Keep track of your child’s immunization easily and on time.
        </P>
      </div>
    </header>
  );
}
