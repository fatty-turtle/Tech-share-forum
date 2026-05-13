import { useAppSelector } from "./useAppDispatch";
import { useAppDispatch } from "./useAppDispatch";
import { logout as logoutAction } from "../../store/authSlice";
import { hasAdminRole } from "../../utils/jwt";

/**
 * Custom hook to get auth state and provide auth helpers
 * Note: Auth initialization is handled by AuthInitializer component
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logoutAction());
  };

  const isAdmin = user ? hasAdminRole(user.roles) : false;

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    logout: handleLogout,
  };
}
