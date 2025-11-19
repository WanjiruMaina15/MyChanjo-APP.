import React from "react";
import { H, P } from "./ReusableComponents/Typography"; 

export default function Header() {
  return (
   <header className="sticky top-0 left-0 w-full bg-gradient-to-b from-[#9b5edc]/30 to-purple-100 border-b-4 border-[#89CFF0] py-4 shadow-md z-50">
  <div className="container mx-auto text-center px-4">
    
    
    <H as="h1" className="text-3xl font-bold tracking-wide text-[#0b2545]">
      MyChanjo
    </H>
    
    <P className="text-lg mt-1 text-[#0b2545] font-medium tracking-wide leading-snug">
          Keep track of your child’s immunization easily and on time.
        </P>
      </div>
    </header>
  );
}
