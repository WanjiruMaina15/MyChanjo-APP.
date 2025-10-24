import React from "react";

export default function Card({
  title,
  children,
  className = "",
  onClick,
  ...props
}) {
  return (
    <div
      className={`bg-white border border-[#b3cde0] rounded-2xl shadow-sm p-6 
      transition-all duration-300 hover:-translate-y-1 hover:shadow-md 
      hover:border-[#c8a2c8] ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Title Section */}
      {title && (
        <h3 className="font-quicksand text-xl text-[#0b2545] mb-3">
          {title}
        </h3>
      )}

      {/* Content Section */}
      <div className="font-lato text-[#0b2545] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
