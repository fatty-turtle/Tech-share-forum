"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import fetchApi from "@/utils/fetchApi";
import useNavigate from "@/hooks/useNavigate";

export default function VerifyEmail() {
  const params = useParams();
  const token = params?.token as string;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      if (!token) return;

      try {
        const result = await fetchApi(
          `http://localhost:4000/auth/verify-email/${token}`,
        );
        const responseObj = result.error
          ? { message: result.error as string }
          : result.response;
        console.log(responseObj);
        setMessage(responseObj?.message || "Verification failed");
      } catch (error) {
        console.error("Verification error:", error);
        setMessage("An error occurred during verification");
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (message && !loading) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, loading, navigate]);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-foreground text-xl">Verifying email...</p>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <p className="text-foreground text-2xl text-center mb-4">{message}</p>
        <p className="text-foreground/70 text-center text-sm">
          Redirecting to login in 3 seconds...
        </p>
      </div>
    </section>
  );
}
