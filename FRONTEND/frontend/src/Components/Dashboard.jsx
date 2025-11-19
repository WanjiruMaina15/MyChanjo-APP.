import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../Apis/axios";
import VaccineList from "./VaccineList"; 
import BabyProfile from "./BabyProfile";

import VaccineCalendar from "./VaccinesCalendar";
import { useAuth, useClerk } from '@clerk/clerk-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [baby, setBaby] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingVaccines, setPendingVaccines] = useState([]);
  const [completedVaccines, setCompletedVaccines] = useState([]);
  const { signOut } = useClerk();
  const { userId, user } = useAuth();

  const userFirstName =
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress.split("@")[0] ||
    "Parent";

  useEffect(() => {
    const fetchBaby = async () => {
      if (!userId) return setLoading(false);

      try {
        setLoading(true);
        const res = await api.get(`/babies/user/${userId}`);

        const babiesData = res.data.babies || res.data;
        if (Array.isArray(babiesData) && babiesData.length > 0) {
          const babyData = babiesData[0];
          setBaby(babyData);

          const pending = babyData.vaccineSchedule.filter(
            (v) => v.status.toLowerCase() === "pending"
          );
          const completed = babyData.vaccineSchedule.filter(
            (v) => v.status.toLowerCase() === "completed"
          );

          setPendingVaccines(pending);
          setCompletedVaccines(completed);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBaby();
  }, [userId]);

  // vaccine update handler
  const handleVaccineUpdate = async (vaccineId, newStatus) => {
    try {
      await api.put(`/vaccines/${vaccineId}`, { status: newStatus });

      if (newStatus === "completed") {
        const item = pendingVaccines.find((v) => v._id === vaccineId);
        if (item) {
          setPendingVaccines((prev) =>
            prev.filter((v) => v._id !== vaccineId)
          );
          setCompletedVaccines((prev) => [...prev, { ...item, status: "completed" }]);
        }
      } else {
        const item = completedVaccines.find((v) => v._id === vaccineId);
        if (item) {
          setCompletedVaccines((prev) =>
            prev.filter((v) => v._id !== vaccineId)
          );
          setPendingVaccines((prev) => [...prev, { ...item, status: "pending" }]);
        }
      }
    } catch (err) {
      console.error("Error updating vaccine", err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-purple-50">
        <P className="text-purple-600">Loading your dashboard...</P>
      </div>
    );

  if (!baby) {
    return (
      <div className="min-h-screen bg-purple-50 pt-20 px-4">
        <Card className="p-10 max-w-lg mx-auto text-center space-y-4 shadow-lg border border-purple-200 bg-white">
          <H as="h2" className="text-3xl font-extrabold text-purple-700">
            Welcome to MyChanjo App!
          </H>
          <P className="text-lg text-gray-600">
            Start by creating a profile for your baby.
          </P>
          <Button
            onClick={() => navigate("/add-baby")}
            variant="primary"
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Add Baby Profile 👶
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 pt-6 pb-10">
      <div className="max-w-5xl mx-auto px-4 space-y-6">

       
        <div className="flex justify-between items-center">
          <H
            as="h1"
            size="xl"
            className="text-purple-700 font-bold"
          >
            Hello, {userFirstName}
          </H>

          <Button
            onClick={() => signOut({ redirectUrl: "/" })}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            Log Out
          </Button>
        </div>

        {/* Baby Profile */}
        <Card className="p-5 shadow-md rounded-xl border border-purple-200 bg-white">
          <BabyProfile baby={baby} />
        </Card>

        {/* Calendar Section */}
        <Card className="p-5 shadow-md rounded-xl border border-purple-200 bg-white">
          <H size="lg" className="mb-4 text-purple-700 font-semibold">
            Vaccination Calendar
          </H>

          <div className="flex justify-center">
            <VaccineCalendar baby={baby} />
          </div>
        </Card>

        {/* Vaccine Schedule Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VaccineList
            vaccines={pendingVaccines}
            title="🕒 Pending Vaccines"
            emptyMessage="No pending vaccines 🎉"
            onVaccineUpdate={handleVaccineUpdate}
          />

          <VaccineList
            vaccines={completedVaccines}
            title="✅ Completed Vaccines"
            emptyMessage="No completed vaccines yet"
            onVaccineUpdate={handleVaccineUpdate}
          />
        </div>

        {/* Resources Button */}
        <div className="text-center pt-3">
          <Button
            onClick={() => navigate("/resources")}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Explore Resources
          </Button>
        </div>
      </div>
    </div>
  );
}