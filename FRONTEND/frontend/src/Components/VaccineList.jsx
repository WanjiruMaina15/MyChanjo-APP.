import React, { useState, useEffect } from "react";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";
import api from "../Apis/axios";

export default function VaccineList({
  vaccines = [],
  title = "Vaccines",
  emptyMessage = "No vaccines available",
  onVaccineUpdate,
}) {

  // THEMED STATUS BADGES
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "given":
        // Soft baby blue
        return "bg-blue-100 text-blue-700 border border-blue-300";

      case "pending":
        // Soft lilac
        return "bg-purple-100 text-purple-700 border border-purple-300";

      case "overdue":
        // Deeper lilac (warning but on-theme)
        return "bg-purple-200 text-purple-800 border border-purple-400";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // EMPTY STATE
  if (!vaccines || vaccines.length === 0) {
    return (
      <Card className="p-6 shadow-sm bg-white border border-purple-100">
        <div className="text-center py-6">
          <P className="text-purple-400 text-base">{emptyMessage}</P>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <H size="lg" className="font-semibold text-purple-700 mb-2">
        {title}
      </H>

      {/* Vaccine Cards */}
      <div className="grid gap-4">
        {vaccines.map((vaccine) => (
          <Card
            key={vaccine._id}
            className="p-4 rounded-xl shadow-sm border border-purple-100 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <H className="text-lg font-bold text-gray-800">
                {vaccine.name}
              </H>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  vaccine.status
                )}`}
              >
                {vaccine.status}
              </span>
            </div>

            {/* Purpose */}
            <P className="text-sm text-gray-700 mb-1">
              {vaccine.purpose?.length
                ? vaccine.purpose.join(", ")
                : "No description available"}
            </P>

            {/* Recommended Age */}
            <P className="text-xs text-gray-500 mb-3">
              Recommended Age: {vaccine.recommendedAge || "N/A"}
            </P>

            {/* Action Buttons */}
            {onVaccineUpdate && (
              <div className="pt-2 border-t border-purple-100 mt-3">
                {vaccine.status?.toLowerCase() !== "completed" ? (
                  <Button
                    onClick={() => onVaccineUpdate(vaccine._id, "completed")}
                    size="sm"
                    variant="primary"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Mark as Completed
                  </Button>
                ) : (
                  <Button
                    onClick={() => onVaccineUpdate(vaccine._id, "pending")}
                    size="sm"
                    variant="outline"
                    className="w-full border-purple-400 text-purple-600 hover:bg-purple-50"
                  >
                    Undo Completion
                  </Button>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}