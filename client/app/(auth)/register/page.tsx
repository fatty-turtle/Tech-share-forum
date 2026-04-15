"use client";
import { useState } from "react";
import fetchApi from "@/utils/fetchApi";
import useNavigate from "@/hooks/useNavigate";
import useForm from "@/hooks/useForm";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { values, errors, loading, handleChange, handleSubmit } =
    useForm<RegisterFormData>({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },

      validate: (v) => {
        const errs: Partial<Record<keyof RegisterFormData, string>> = {};
        if (!v.username) errs.username = "Full name is required";
        if (!v.email) errs.email = "Email is required";
        if (!v.password) errs.password = "Password is required";
        if (!v.confirmPassword)
          errs.confirmPassword = "Please confirm your password";
        if (v.password && v.confirmPassword && v.password !== v.confirmPassword)
          errs.confirmPassword = "Passwords do not match";
        return errs;
      },

      onSubmit: async (v) => {
        setServerError("");
        const result = await fetchApi("/auth/register", "POST", v);
        if (result.error) {
          setServerError(result.error);
        } else {
          alert(
            "Registration successful! Please check your email to verify your account.",
          );
          navigate("/login");
        }
      },
    });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
          Create Account
        </h2>

        {serverError && (
          <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Vinh Pham"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
