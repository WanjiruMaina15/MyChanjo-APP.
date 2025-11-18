import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Input from "./ReusableComponents/Input";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";
import { useAuth } from '@clerk/clerk-react';
import api from "../Apis/axios";


export default function BabyInfoPage() {
  // State hooks
  const navigate = useNavigate();
  const { userId, user } = useAuth();

  const getClerkDisplayName = (user) => {
    if (!user) return "";
    return (
      user.fullName ||
      user.firstName ||
      user.emailAddresses?.[0]?.emailAddress ||
      ""
    );
  };

  const initialParentName = getClerkDisplayName(user);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    parentName: initialParentName,
  });

  useEffect(() => {
    if (user && formData.parentName === "") {
      setFormData((prev) => ({
        ...prev,
        parentName: getClerkDisplayName(user),
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [calculatedAge, setCalculatedAge] = useState("");
 

  
  useEffect(() => {
    const checkExistingBaby = async () => {
      try {
        const currentUserId = userId || localStorage.getItem("userId");
        if (!currentUserId) return;

        const response = await api.get(`/babies/user/${currentUserId}`);

        
        if (response.data && response.data.length > 0) {
          const existingBaby = response.data[0];
          localStorage.setItem("currentBabyId", existingBaby._id);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error checking existing baby:", err);
      }
    };

    if (userId) {
        checkExistingBaby();
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (formData.dateOfBirth) {
      setCalculatedAge(calculateAge(formData.dateOfBirth));
    }
  }, [formData.dateOfBirth]);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const months =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      today.getMonth() -
      birthDate.getMonth();

    if (today.getDate() < birthDate.getDate()) {
      const adjustedMonths = months - 1;
      if (adjustedMonths < 1) return "Less than 1 month old";
      if (adjustedMonths < 12)
        return `${adjustedMonths} ${
          adjustedMonths === 1 ? "month" : "months"
        } old`;
    }

    if (months < 12) {
      return `${months} ${months === 1 ? "month" : "months"} old`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? "year" : "years"} old`;
      }
      return `${years} ${
        years === 1 ? "year" : "years"
      }, ${remainingMonths} ${
        remainingMonths === 1 ? "month" : "months"
      } old`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.dateOfBirth) {
      setError("Please fill out all fields.");
      return;
    }

    if (!userId) {
      setError("Authentication failed. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        parentName: formData.parentName,
        clerkUserId: userId,
        ...(formData.photoUrl && { photoUrl: formData.photoUrl }),
      };

      console.log("Sending payload:", payload); // Debug log

      const response = await api.post("/babies", payload);

      if (response.status >= 200 && response.status < 300) {
        const baby = response.data.baby || response.data;
        
        if (baby && baby._id) {
          localStorage.setItem("currentBabyId", baby._id);
        }
        
       
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Baby info error:", err);
      setError(
        err.response?.data?.message ||
          "Server Error: Could not save baby. Check backend logs."
      );
    } finally {e
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f8fb] px-4">
      <Card className="w-full max-w-md">
        <H as="h2" className="text-center text-3xl mb-2">
          Add New Baby
        </H>
        <P className="text-center mb-6 text-[#0b2545]">
          Please provide your baby's details 💜
        </P>

        <div className="flex flex-col items-center mb-6">
          {imagePreview ? (
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sky-300">
                <img
                  src={imagePreview}
                  alt="Baby preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 text-sky-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          )}

          <label className="cursor-pointer mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span>Upload Photo</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            label="Baby Name"
            name="name"
            placeholder="Enter baby's full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Parent Name (from Clerk)"
            name="parentName"
            placeholder="Parent Name"
            value={initialParentName}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />

          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={today}
            required
          />

          {calculatedAge && (
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
              <p className="text-sm text-sky-800 font-medium">
                Current Age:{" "}
                <span className="text-sky-600 font-bold">{calculatedAge}</span>
              </p>
            </div>
          )}

          {error && (
            <P className="text-red-500 text-sm text-center font-medium">
              {error}
            </P>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Baby Info & Generate Schedule"}
          </Button>
        </form>
      </Card>
    </div>
  );
}