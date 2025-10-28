import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { H, P } from "./ReusableComponents/Typography";
import Input from "./ReusableComponents/Input";
import Button from "./ReusableComponents/Buttons";
import Card from "./ReusableComponents/Cards";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Optional: store token or user info
        localStorage.setItem("token", data.token);S
        localStorage.setItem("userName", data.fullName);
        localStorage.setItem("userId", data.id);

        // Navigate to BabyInfoPage
        navigate("/baby-info");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f8fb] px-4">
      <Card className="w-full max-w-md">
        <H as="h2" className="text-center text-3xl mb-2">
          MyChanjo
        </H>
        <P className="text-center mb-6 text-[#0b2545]">
          Afya yako, chanjo zako, kwa urahisi 💜
        </P>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <P className="text-red-500 text-sm">{error}</P>}

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <P className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#b57edc] hover:underline cursor-pointer"
            >
              Register
            </span>
          </P>
        </form>
      </Card>
    </div>
  );
}
