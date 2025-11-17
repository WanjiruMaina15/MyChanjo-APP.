import React, { useState, useEffect } from "react";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";
import api from "../Apis/axios";

export default function VaccineList({
  vaccines = [],
  title = "Vaccines",
  emptyMessage = "No vaccines available",
  onVaccineUpdate
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "given":
        return "bg-green-200 text-green-800";
      case "pending":
        return "bg-amber-200 text-amber-800";
      case "overdue":
        return "bg-purple-200 text-purple-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (!vaccines || vaccines.length === 0) {
    return (
      <Card className="p-6">
        <P className="text-center text-muted-foreground">{emptyMessage}</P>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <H size="lg">{title}</H>

      <div className="grid md:grid-cols-1 gap-4">
        {vaccines.map((vaccine) => (
          <Card key={vaccine._id} className="p-4">
            <div className="flex justify-between items-center mb-3">
              <H className="text-lg font-semibold">{vaccine.name}</H>

              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                  vaccine.status
                )}`}
              >
                {vaccine.status}
              </span>
            </div>

            <P className="text-sm text-gray-700 mb-2">
              {vaccine.purpose?.join(", ") || "No description available"}
            </P>

            <P className="text-sm text-gray-500 mb-3">
              Recommended Age: {vaccine.recommendedAge}
            </P>

            {onVaccineUpdate && (
              <div className="flex gap-2">
                {vaccine.status !== "completed" ? (
                  <Button
        onClick={() => onVaccineUpdate(vaccine._id, "completed")}
        size="sm"
        variant="primary"
      >
        Mark as Completed
      </Button>
    ) : (
      // Show 'Undo' if it IS complete
      <Button
        onClick={() => onVaccineUpdate(vaccine._id, "pending")}
        size="sm"
        variant="outline"
      >
        Undo
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
