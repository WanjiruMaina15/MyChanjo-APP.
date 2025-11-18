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
import Header from "./Header";
import VaccineCalendar from "./VaccinesCalendar";
import { useAuth, useClerk } from '@clerk/clerk-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [baby, setBaby] = useState(null);
  const [vaccines, setVaccines] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(`/babies/user/${userId}`);

       
        const babiesData = res.data.babies || res.data;

        if (Array.isArray(babiesData) && babiesData.length > 0) {
          const babyData = babiesData[0];

         
          setBaby(babyData); 

          const pending = babyData.vaccineSchedule.filter(
            (v) => v.status === "Pending" || v.status === "pending"
          );
          const completed = babyData.vaccineSchedule.filter(
            (v) => v.status === "Completed" || v.status === "completed"
          );

          setPendingVaccines(pending);
          setCompletedVaccines(completed);
        } else {
          setBaby(null);
        }
      } catch (err) {
        console.error("Error fetching baby:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBaby();
  }, [userId]);

  
  const handleVaccineUpdate = async (vaccineId, newStatus) => {
    try {
      
      await api.put(`/vaccines/${vaccineId}`, { status: newStatus });

      const moveVaccine = (targetListSetter, sourceListSetter, status) => {
        let itemToMove;

        sourceListSetter((prevSource) => {
          const index = prevSource.findIndex((v) => v._id === vaccineId);
          if (index !== -1) {
            itemToMove = prevSource[index];
            return prevSource.filter((v) => v._id !== vaccineId);
          }
          return prevSource;
        });

        if (itemToMove) {
          targetListSetter((prevTarget) => [
            ...prevTarget,
            { ...itemToMove, status },
          ]);
        }
      };

      if (newStatus === "completed") {
        moveVaccine(setCompletedVaccines, setPendingVaccines, newStatus);
      } else if (newStatus === "pending") {
        moveVaccine(setPendingVaccines, setCompletedVaccines, newStatus);
      }
    } catch (error) {
      console.error("Error updating vaccine status:", error);
    }
  };

  
  if (loading) return <div className="p-10 text-center"><P>Loading baby info...</P></div>;
  
 
  if (!baby) {
    return (
      <div className="min-h-screen bg-[#f4f8fb] pt-20 px-4">
        <Card className="p-10 max-w-lg mx-auto text-center space-y-4 shadow-xl">
          <H as="h2" className="text-3xl font-extrabold text-sky-700">
            Welcome to MyChanjo App!
          </H>
          <P className="text-lg text-gray-600">
            Create a profile for your baby to start tracking their schedule.
          </P>
          <Button
            onClick={() => navigate("/add-baby")}
            variant="primary"
          >
            Add Your Baby Now 👶
          </Button>
        </Card>
      </div>
    );
  }

  // Render the Dashboard
  return (
    <div className="min-h-screen bg-[#f4f8fb]">
      <Header />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800">
            👋 Welcome Back, {userFirstName}
            </h1>
            <Button onClick={() => signOut({ redirectUrl: "/" })} variant="outline">
            Log Out
            </Button>
        </div>

        <div className="space-y-8">
            {/* Baby Profile Section */}
            <Card className="p-6">
            <div className="mt-6">
                <BabyProfile baby={baby} />
            </div>
            </Card>

            {/* Calendar Section */}
            <Card className="p-6 mb-8">
                <H size="lg" className="mb-4">
                    Vaccination Calendar
                </H>
                <VaccineCalendar
                    baby={baby}
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="mx-auto"
                />
            </Card>

            {/* Vaccine Schedule Section */}
            <div className="grid md:grid-cols-2 gap-6">
            
            <VaccineList
                vaccines={pendingVaccines}
                title="Pending Vaccines"
                emptyMessage="No pending vaccines 🎉"
                onVaccineUpdate={handleVaccineUpdate}
            />

           
            <VaccineList
                vaccines={completedVaccines}
                title="Completed Vaccines"
                emptyMessage="No completed vaccines yet"
                onVaccineUpdate={handleVaccineUpdate}
            />
            </div>

            <div className="mt-8 text-center">
                <Button onClick={() => navigate("/resources")}>
                    Explore Resources
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}