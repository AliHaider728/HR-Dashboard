import React from "react";

const Footer = () => {
  return (
    <footer className="bg-whit text-gray-900 py-4 px-6 flex flex-col sm:flex-row justify-between items-center ">
      <p className="text-sm font-bold font-serif animate-shine bg-clip-text bg-gradient-to-r from-black via-gray-300 to-black bg-[length:200%_auto] text-transparent mb-2 sm:mb-0">
    2025 © SmartHR.
      </p>
      <p className=" font-thin font-serif sm:text-center animate-shine bg-clip-text bg-gradient-to-r from-gray-800 via-gray-300 to-black bg-[length:200%_auto] text-transparent">
        Designed and developed by <span className="font-bold" > TecnoSphere</span>
      </p>
      <style>{`
      
        @keyframes shine {
          0% {
            background-position: 200%;
          }
          100% {
            background-position: -200%;
          }
        }
        .animate-shine {
          animation: shine 3s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;