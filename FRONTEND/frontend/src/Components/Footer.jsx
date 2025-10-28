import React from "react";
import { P } from "./ReusableComponents/Typography";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-purple-100 to-[#9b5edc]/30 text-[#0b2545] py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* App info */}
        <P className="font-quicksand text-lg font-semibold">
          MyChanjo App
        </P>
        <P className="text-sm mt-1">
          Afya yako, chanjo zako, kwa urahisi 💙💜
        </P>

        {/* Quick links */}
        <div className="flex justify-center gap-6 mt-3 text-sm font-lato">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/resources" className="hover:underline">Resources</a>
          <a href="/add-child" className="hover:underline">Add Child</a>
        </div>

        {/* Contact */}
        <div className="flex justify-center gap-4 mt-3 text-sm font-lato">
          <a href="mailto:support@mychanjo.com" className="hover:underline">
            support@mychanjo.com
          </a>
          <a href="https://twitter.com/mychanjo" target="_blank" className="hover:underline">
            Twitter
          </a>
        </div>

        {/* Legal */}
        <div className="mt-3 text-xs text-[#0b2545]/80">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> ·{" "}
          <a href="/terms" className="hover:underline">Terms of Use</a>
        </div>

        {/* Copyright */}
        <P className="text-xs mt-3">
          © {new Date().getFullYear()} MyChanjo. All rights reserved.
        </P>
      </div>
    </footer>
  );
}
