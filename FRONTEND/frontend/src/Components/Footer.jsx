import { Link } from "react-router-dom"; 
import { P } from "./ReusableComponents/Typography"; 

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-purple-100 to-[#9b5edc]/30 text-[#0b2545] py-8 mt-10 border-t-4 border-[#89CFF0]">
      <div className="max-w-6xl mx-auto px-6 text-center">

       
        <P className="font-quicksand text-xl font-bold tracking-wide">
          MyChanjo
        </P>
        <P className="text-sm mt-1 font-medium opacity-90">
          Afya yako, chanjo zako, kwa urahisi 💙💜
        </P>

        <div className="flex justify-center gap-6 mt-5 text-sm font-lato font-semibold">
          <Link to="/dashboard" className="hover:text-[#9b5edc] transition-colors">Dashboard</Link>
          <Link to="/resources" className="hover:text-[#9b5edc] transition-colors">Resources</Link>
        
          <Link to="/add-baby" className="hover:text-[#9b5edc] transition-colors">Add Baby</Link>
        </div>

       
        <div className="flex justify-center gap-4 mt-4 text-sm font-lato opacity-80">
          <a href="mailto:support@mychanjo.com" className="hover:underline">
            support@mychanjo.com
          </a>
          <span>|</span>
          <a href="https://twitter.com/mychanjo" target="_blank" rel="noreferrer" className="hover:underline">
            Twitter
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-[#0b2545]/10 text-xs text-[#0b2545]/70">
          <div className="flex justify-center gap-4 mb-2">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Use</Link>
          </div>
          <P className="text-xs">
            © {new Date().getFullYear()} MyChanjo. All rights reserved.
          </P>
        </div>

      </div>
    </footer>
  );
}