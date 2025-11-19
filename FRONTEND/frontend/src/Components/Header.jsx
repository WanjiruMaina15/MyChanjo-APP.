import React from "react";
import { H, P } from "./ReusableComponents/Typography"; 

export default function Header() {
  return (
   <header className="sticky top-0 left-0 w-full bg-[#8134D3] border-b-4 border-[#22D3EE] py-4 shadow-md z-50">
  <div className="container mx-auto text-center px-4">
    
    
    <H as="h1" className="text-3xl font-bold tracking-wide text-white">
      MyChanjo
    </H>
    
    <P className="text-lg mt-1 font-medium tracking-wide leading-snug text-white/90">
          Keep track of your child’s immunization easily and on time.
        </P>
      </div>
    </header>
  );
}
