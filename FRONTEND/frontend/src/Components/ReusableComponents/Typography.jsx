import React from "react";

// Heading
export function H({ as = "h2", children, className = "", ...props }) {
  const Tag = as;
  return (
    <Tag
      className={`font-quicksand text-[#0b2545] ${className}`}
      style={{ lineHeight: 1.4 }}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Paragraph
export function P({ children, className = "", ...props }) {
  return (
    <p
      className={`font-lato text-[#0b2545] ${className}`}
      style={{ lineHeight: 1.6 }}
      {...props}
    >
      {children}
    </p>
  );
}