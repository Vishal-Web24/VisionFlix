import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-[#737373] px-6 md:px-16 py-12">
      {/* Top text */}
      <p className="mb-8 text-sm">
        Questions? Contact us.
      </p>

      {/* Links grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm max-w-5xl">
        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">FAQ</li>
          <li className="hover:underline cursor-pointer">Investor Relations</li>
          <li className="hover:underline cursor-pointer">Privacy</li>
          <li className="hover:underline cursor-pointer">Speed Test</li>
        </ul>

        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Help Centre</li>
          <li className="hover:underline cursor-pointer">Jobs</li>
          <li className="hover:underline cursor-pointer">Cookie Preferences</li>
          <li className="hover:underline cursor-pointer">Legal Notices</li>
        </ul>

        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Account</li>
          <li className="hover:underline cursor-pointer">Ways to Watch</li>
          <li className="hover:underline cursor-pointer">Corporate Information</li>
          <li className="hover:underline cursor-pointer">Only on VisionFlix</li>
        </ul>

        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Media Centre</li>
          <li className="hover:underline cursor-pointer">Terms of Use</li>
          <li className="hover:underline cursor-pointer">Contact Us</li>
        </ul>
      </div>

      {/* Bottom text */}
      <div className="mt-10 text-sm">
        <p className="mb-2">VisionFlix India</p>
        <p className="text-xs">
          Developed by <span className="text-white font-medium">Vishal</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
