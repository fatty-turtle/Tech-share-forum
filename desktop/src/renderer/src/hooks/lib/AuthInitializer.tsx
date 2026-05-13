"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { setUser, setLoading } from "../../store/authSlice";
import { decodeJwt } from "../../utils/jwt";

/**
 * Component to initialize auth state from localStorage token
 * Should be used once at the root level
 */
export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = decodeJwt(token);
      if (payload) {
        dispatch(
          setUser({
            user_id: payload.user_id,
            roles: payload.roles,
            email: payload.email,
            username: payload.username,
          }),
        );
      } else {
        // Token invalid - clear it
        localStorage.removeItem("accessToken");
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return null;
}
