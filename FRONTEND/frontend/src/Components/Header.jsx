import React from "react";
import { H, P } from "./ReusableComponents/Typography"; 

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#7FDBDA] text-[#0b2545] py-4 shadow-md z-50">
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
