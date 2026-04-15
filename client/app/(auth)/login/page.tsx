"use client";
import React, { useState } from "react";
import fetchApi from "@/utils/fetchApi";
import useNavigate from "@/hooks/useNavigate";
import useForm from "@/hooks/useForm";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { values, errors, loading, handleChange, handleSubmit } =
    useForm<LoginFormData>({
      initialValues: { email: "", password: "" },

      validate: (v) => {
        const errs: Partial<Record<keyof LoginFormData, string>> = {};
        if (!v.email) errs.email = "Email is required";
        if (!v.password) errs.password = "Password is required";
        return errs;
      },

      onSubmit: async (v) => {
        setServerError("");
        const result = await fetchApi("/auth/login", "POST", v);
        if (result.error) {
          setServerError(result.error);
        } else {
          localStorage.setItem("accessToken", result.response.token);
          navigate("/");
        }
      },
    });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
          Login
        </h2>

        {serverError && (
          <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-foreground hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
