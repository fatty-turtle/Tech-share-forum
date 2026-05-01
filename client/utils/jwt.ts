/**
 * Decodes a JWT token and returns the payload.
 * Note: This is for client-side decoding only - NOT for verification.
 */

import { UserRole } from "@/store/authSlice";

interface JwtPayload {
  user_id: number;
  roles: UserRole[];
  email?: string;
  username?: string;
  iat?: number;
  exp?: number;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const payload = JSON.parse(jsonPayload);

    // Convert singular role to array if needed (server sends 'role', client expects 'roles')
    if (payload.role && !payload.roles) {
      payload.roles = [payload.role];
    }

    return payload;
  } catch {
    return null;
  }
}

export function hasAdminRole(roles: UserRole[]): boolean {
  return roles.includes("ADMIN");
}
