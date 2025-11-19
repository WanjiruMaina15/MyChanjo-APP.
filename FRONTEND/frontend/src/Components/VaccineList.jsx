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

 
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "given":
       
        return "bg-blue-100 text-blue-700 border border-blue-300";

      case "pending":
      
        return "bg-purple-100 text-purple-700 border border-purple-300";

      case "overdue":
        
        return "bg-purple-200 text-purple-800 border border-purple-400";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

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
     
      <H size="lg" className="font-semibold text-purple-700 mb-2">
        {title}
      </H>

     
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

             </div>

          
            <P className="text-sm text-gray-700 mb-1">
              {vaccine.purpose?.length
                ? vaccine.purpose.join(", ")
                : "No description available"}
            </P>

           
            <P className="text-xs text-gray-500 mb-3">
              Recommended Age: {vaccine.recommendedAge || "N/A"}
            </P>

           
            {onVaccineUpdate && (
              <div className="pt-2 border-t border-purple-100 mt-3">
                {vaccine.status?.toLowerCase() !== "completed" ? (
                  <Button
                    onClick={() => onVaccineUpdate(vaccine._id, "completed")}
                    size="sm"
                    variant="primary"
                    className="w-auto px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 rounded transition-colors shadow-sm"
                  >
                    RECEIVED
                  </Button>
                ) : (
                  <Button
                    onClick={() => onVaccineUpdate(vaccine._id, "pending")}
                    size="sm"
                    variant="outline"
                    className="w-auto px-4 py-2 text-sm font-medium bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                  >
                  
                    UNDO
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