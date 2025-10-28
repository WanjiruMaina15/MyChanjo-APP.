import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function VaccineScheduleDashboard() {
  const navigate = useNavigate();
  const [baby, setBaby] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Fetch the baby's vaccine schedule
  useEffect(() => {
    const fetchBabyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/babies"); // adjust your backend route
        const data = await response.json();
        if (data && data.baby) {
          setBaby(data.baby);
        }
      } catch (error) {
        console.error("Error fetching baby data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBabyData();
  }, []);

  // Filter vaccines by status
  const pendingVaccines = baby?.vaccineSchedule?.filter(v => v.status === "pending") || [];
  const completedVaccines = baby?.vaccineSchedule?.filter(v => v.status === "completed") || [];

  // Handle marking vaccine as completed
  const markAsCompleted = async (vaccineId) => {
    try {
      await fetch(`http://localhost:5000/api/vaccines/${vaccineId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      // Update UI instantly
      setBaby(prev => ({
        ...prev,
        vaccineSchedule: prev.vaccineSchedule.map(v =>
          v.vaccineId === vaccineId ? { ...v, status: "completed" } : v
        ),
      }));
    } catch (error) {
      console.error("Error updating vaccine status:", error);
    }
  };

  if (loading) return <P>Loading schedule...</P>;
  if (!baby) return <P>No baby data found.</P>;

  return (
    <div className="p-6 bg-[#f9fbfd] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <H text={`Vaccine Schedule for ${baby.name}`} />
        <Button text="Add New Baby" onClick={() => navigate("/add-baby")} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Calendar */}
        <Card>
          <H text="Calendar Overview" size="lg" />
          <div className="mt-4">
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileClassName={({ date }) => {
                const hasVaccine = baby.vaccineSchedule.some(v =>
                  new Date(v.date).toDateString() === date.toDateString()
                );
                return hasVaccine ? "bg-blue-200 rounded-full" : "";
              }}
            />
          </div>
        </Card>

        {/* Right: Vaccine List */}
        <Card>
          <H text="Upcoming Vaccines" size="lg" />
          <div className="mt-4 space-y-3">
            {pendingVaccines.length === 0 ? (
              <P>No pending vaccines 🎉</P>
            ) : (
              pendingVaccines.map((v) => (
                <div
                  key={v.vaccineId}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <P text={v.name} />
                    <P
                      text={`Due: ${new Date(v.date).toLocaleDateString()}`}
                      className="text-sm text-gray-500"
                    />
                  </div>
                  <Button
                    text="Mark as Done"
                    onClick={() => markAsCompleted(v.vaccineId)}
                    variant="secondary"
                  />
                </div>
              ))
            )}
          </div>

          <H text="Completed Vaccines" size="lg" className="mt-6" />
          <div className="mt-2 space-y-2">
            {completedVaccines.length === 0 ? (
              <P>No completed vaccines yet.</P>
            ) : (
              completedVaccines.map((v) => (
                <P
                  key={v.vaccineId}
                  text={`${v.name} - ${new Date(v.date).toLocaleDateString()}`}
                  className="text-green-600"
                />
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
// This component displays a dashboard with a calendar and vaccine schedule.