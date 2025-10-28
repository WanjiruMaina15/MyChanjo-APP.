import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { P, H } from '../ReusableComponents/Typography';
import Card from '../ReusableComponents/Cards';
import 'react-calendar/dist/Calendar.css'; 
import './VaccineCalendar.css'; // Assuming you created this for custom styles

// Helper function to check if two Date objects represent the same day
const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

export default function VaccineCalendar({ baby }) {
  // Initialize the calendar to the current date, or a date relevant to the baby
  const [value, onChange] = useState(new Date()); 
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  // Function to apply the color marker (dot) to the calendar tile
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null; // Only apply markers in the month view

    const vaccineEvent = baby.vaccineSchedule.find(vaccine => 
      // Check if the tile date matches any vaccine date
      isSameDay(date, new Date(vaccine.date))
    );

    if (vaccineEvent) {
      let colorClass = '';
      
      switch (vaccineEvent.status) {
        case 'done':
          colorClass = 'bg-green-500'; // Success (Green Tone) 🟢
          break;
        case 'pending':
          colorClass = 'bg-amber-400'; // Pending (Yellow/Amber Tone) 🟡
          break;
        case 'missed':
          colorClass = 'bg-[#9b5edc]'; // Alert (Lilac Accent Color) 💜
          break;
        default:
          return null;
      }
      
      // Render a colored dot on the tile
      return (
        <div className="flex justify-center items-center mt-1">
          <div 
            className={`w-2 h-2 rounded-full ${colorClass}`} 
            title={`${vaccineEvent.name} (${vaccineEvent.status})`}
          ></div>
        </div>
      );
    }
    return null;
  };

  // Function to display details when a date is clicked
  const handleDateClick = (date) => {
    onChange(date); // Update the calendar's internal state to show the selected month
    
    // Find all vaccines on the clicked date
    const events = baby.vaccineSchedule.filter(vaccine => 
      isSameDay(date, new Date(vaccine.date))
    );
    
    setSelectedVaccine(events);
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* -------------------- CALENDAR VIEW -------------------- */}
      <div className="lg:w-1/2 w-full">
        <H as="h3" className="text-xl mb-3 text-[#0b2545]">
          {baby.name}'s Vaccination Timeline
        </H>
        <Card className="p-4 custom-calendar-container"> 
            <Calendar
                onChange={handleDateClick}
                value={value}
                tileContent={tileContent}
                className="w-full border-none p-0 rounded-lg shadow-none"
                locale="en-US"
                minDetail="month" // Prevents zooming out too far
            />
        </Card>
      </div>

      {/* -------------------- DATE DETAILS VIEW -------------------- */}
      <div className="lg:w-1/2 w-full">
        <H as="h3" className="text-xl mb-3 text-[#0b2545]">
          Details for {value.toDateString()}
        </H>
        <Card className="p-4 min-h-[300px]">
          {selectedVaccine && selectedVaccine.length > 0 ? (
            <div className="space-y-3">
              {selectedVaccine.map((v, index) => (
                <div key={index} className={`p-3 rounded-lg border 
                  ${v.status === 'done' ? 'bg-green-50 border-green-300' : ''}
                  ${v.status === 'pending' ? 'bg-amber-50 border-amber-300' : ''}
                  ${v.status === 'missed' ? 'bg-purple-50 border-[#9b5edc]' : ''}
                `}>
                  <P className="font-semibold text-[#0b2545]">{v.name}</P>
                  <P className={`text-sm font-medium ${v.status === 'done' ? 'text-green-600' : v.status === 'pending' ? 'text-amber-600' : 'text-[#9b5edc]'}`}>
                    Status: {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                  </P>
                  <P className="text-sm mt-1">
                    Due/Completed: {new Date(v.date).toLocaleDateString()}
                  </P>
                </div>
              ))}
            </div>
          ) : (
            <P className="text-gray-500">
              Select a date on the calendar to view vaccine details.
            </P>
          )}
        </Card>
      </div>
    </div>
  );
}