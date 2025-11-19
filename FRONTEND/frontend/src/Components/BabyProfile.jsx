import React from "react";
import { H, P } from "./ReusableComponents/Typography";

export default function BabyProfileCard({ baby }) {
  if (!baby) return null;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let months =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());

    if (today.getDate() < birthDate.getDate()) months -= 1;

    if (months < 1) return "Less than 1 month old";
    if (months < 12) return `${months} months old`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) return `${years} years old`;
    return `${years} years, ${remainingMonths} mon`;
  };

  return (
    <div className="flex items-center gap-6">

     
      <div className="w-24 h-24 rounded-full border-4 border-purple-300 overflow-hidden bg-purple-100 flex items-center justify-center">
        {baby.photoUrl ? (
          <img
            src={baby.photoUrl}
            alt={baby.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-purple-700">
            {getInitials(baby.name)}
          </span>
        )}
      </div>

     
      <div>
        <H size="lg" className="text-purple-800 font-semibold">
          {baby.name}
        </H>

        <P className="text-gray-600">
          Born: {new Date(baby.dateOfBirth).toLocaleDateString()}
        </P>

        <P className="font-semibold text-purple-600">
          Age: {calculateAge(baby.dateOfBirth)}
        </P>
      </div>
    </div>
  );
}





