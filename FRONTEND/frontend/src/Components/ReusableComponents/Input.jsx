import React from "react";
import { P } from "./Typography";


export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  icon, // optional icon
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label className="font-quicksand text-[#0b2545] mb-1 text-sm">
          {label}
        </label>
      )}

      {/* Input container (for icon + input alignment) */}
      <div className="relative flex items-center">
        {/* Icon (if provided) */}
        {icon && <span className="absolute left-3 text-[#b57edc]">{icon}</span>}

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`font-lato border border-[#b57edc] rounded-xl w-full px-4 py-2 text-[#0b2545] focus:outline-none focus:ring-2 focus:ring-[#b57edc] transition duration-300 ${
            icon ? "pl-10" : ""
          }`}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && <P className="text-red-500 text-xs mt-1">{error}</P>}
    </div>
  );
}
