import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Input from "./ReusableComponents/Input";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";

export default function BabyInfoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    parentName: localStorage.getItem("userName") || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.dateOfBirth) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      // Convert the date string to ISO format
      const payload = {
        name: formData.name,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
      };

      const response = await fetch("http://localhost:5000/api/babies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        // Store baby ID if needed for later use
        if (data.baby && data.baby._id) {
          localStorage.setItem("currentBabyId", data.baby._id);
        }
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to save baby info.");
      }
    } catch (err) {
      console.error("Baby info error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate max date (today)
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
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={today}
            required
          />

          {error && <P className="text-red-500 text-sm">{error}</P>}

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Saving..." : "Save Baby Info"}
          </Button>
        </form>
      </Card>
    </div>
  );
}