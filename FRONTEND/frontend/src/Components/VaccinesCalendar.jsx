import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { P, H } from './ReusableComponents/Typography';
import Card from './ReusableComponents/Cards';
import 'react-calendar/dist/Calendar.css'

// Helper to check if two dates are the same day
const isSameDay = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export default function VaccineCalendar({ baby }) {
  const [value, setValue] = useState(new Date());
  const [selectedVaccine, setSelectedVaccine] = useState([]);

  const handleDateClick = (date) => {
    setValue(date);
    const events = baby.vaccineSchedule.filter((vaccine) =>
      isSameDay(date, new Date(vaccine.date))
    );
    setSelectedVaccine(events);
  };

  // Color-coded dots on the calendar
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const vaccineEvent = baby.vaccineSchedule.find((v) =>
      isSameDay(date, new Date(v.date))
    );

    if (!vaccineEvent) return null;

    let colorClass = '';
    switch (vaccineEvent.status) {
      case 'done':
        colorClass = 'bg-green-500';
        break;
      case 'pending':
        colorClass = 'bg-amber-400';
        break;
      case 'missed':
        colorClass = 'bg-[#9b5edc]';
        break;
      default:
        return null;
    }

    return (
      <div className="flex justify-center items-center mt-1">
        <div
          className={`w-2 h-2 rounded-full ${colorClass}`}
          title={`${vaccineEvent.name} (${vaccineEvent.status})`}
        ></div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ---------------- CALENDAR SECTION ---------------- */}
      <div className="lg:w-1/2 w-full">
        <H as="h3" className="text-xl mb-3 text-[#0b2545]">
          {baby.name}'s Vaccination Timeline
        </H>
        <Card className="p-4 shadow-md rounded-xl">
          <Calendar
            onChange={handleDateClick}
            value={value}
            tileContent={tileContent}
            className="w-full border-none rounded-lg shadow-none custom-calendar"
            locale="en-US"
            minDetail="month"
            next2Label={null}
            prev2Label={null}
            navigationLabel={({ date }) =>
              date.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })
            }
          />
        </Card>
      </div>

      {/* ---------------- VACCINE DETAILS SECTION ---------------- */}
      <div className="lg:w-1/2 w-full">
        <H as="h3" className="text-xl mb-3 text-[#0b2545]">
          Details for {value.toDateString()}
        </H>
        <Card className="p-4 min-h-[300px] border rounded-xl">
          {selectedVaccine.length > 0 ? (
            <div className="space-y-3">
              {selectedVaccine.map((v, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300
                    ${
                      v.status === 'done'
                        ? 'bg-green-50 border-green-300'
                        : v.status === 'pending'
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-purple-50 border-[#9b5edc]'
                    }`}
                >
                  <P className="font-semibold text-[#0b2545]">{v.name}</P>
                  <P
                    className={`text-sm font-medium ${
                      v.status === 'done'
                        ? 'text-green-600'
                        : v.status === 'pending'
                        ? 'text-amber-600'
                        : 'text-[#9b5edc]'
                    }`}
                  >
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

        {/* ---------------- LEGEND ---------------- */}
        <div className="mt-6">
          <P className="text-sm font-semibold text-[#0b2545] mb-2">Legend</P>
          <div className="flex gap-6 text-xs items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Done</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#9b5edc]" />
              <span>Missed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
