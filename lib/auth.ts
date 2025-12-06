// Simple authentication utilities
// In production, this should be replaced with proper authentication

const AUTH_KEY = "homiehome_auth";
const AUTH_USERNAME = "home123";
const AUTH_PASSWORD = "home123";

export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}

export function login(username: string, password: string): boolean {
  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    const user: AuthUser = {
      username,
      isAuthenticated: true,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    // Redirect will be handled by the component calling logout
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return false;
    
    const user: AuthUser = JSON.parse(authData);
    return user.isAuthenticated === true;
  } catch {
    return false;
  }
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  
  try {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return null;
    
    return JSON.parse(authData);
  } catch {
    return null;
  }
}
