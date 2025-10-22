import { create } from "zustand";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id"> & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  // OTP-related methods
  sendOtpCode: (
    email: string
  ) => Promise<{ success: boolean; isNewUser: boolean }>;
  verifyOtpCode: (
    email: string,
    code: string,
    isNewUser: boolean
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      console.log("Login attempt:", { email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser: User = {
        id: "1",
        email,
        firstName: "",
        lastName: "",
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      // Store in localStorage for persistence
      localStorage.setItem("auth-user", JSON.stringify(mockUser));

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      set({ isLoading: false });
      return false;
    }
  },

  register: async (userData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Registration attempt:", userData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      const mockUser: User = {
        id: "1",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      // Store in localStorage for persistence
      localStorage.setItem("auth-user", JSON.stringify(mockUser));

      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    // Clear all auth-related localStorage items
    localStorage.removeItem("auth-user");
    localStorage.removeItem("otp-code");
    localStorage.removeItem("otp-email");
    localStorage.removeItem("otp-is-new-user");
  },

  checkAuth: async () => {
    try {
      // Check localStorage for persisted user
      const storedUser = localStorage.getItem("auth-user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Simulate token validation
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // OTP-related methods
  sendOtpCode: async (email: string) => {
    try {
      // TODO: Replace with actual API call
      console.log("Sending OTP code to:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock logic to determine if user exists
      // In a real app, this would be determined by the backend
      const isNewUser = false; // For testing purposes, assume existing user

      // Store the code temporarily for verification (in real app, this would be handled by backend)
      const mockCode = "123456";
      localStorage.setItem("otp-code", mockCode);
      localStorage.setItem("otp-email", email);
      localStorage.setItem("otp-is-new-user", isNewUser.toString());

      console.log(
        `Mock OTP code for ${email}: ${mockCode} (isNewUser: ${isNewUser})`
      );

      return { success: true, isNewUser };
    } catch (error) {
      console.error("Failed to send OTP code:", error);
      return { success: false, isNewUser: false };
    }
  },

  verifyOtpCode: async (email: string, code: string, isNewUser: boolean) => {
    try {
      // TODO: Replace with actual API call
      console.log("Verifying OTP code:", { email, code, isNewUser });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock verification - check against stored code
      const storedCode = localStorage.getItem("otp-code");
      const storedEmail = localStorage.getItem("otp-email");

      if (storedCode !== code || storedEmail !== email) {
        console.log("OTP verification failed: Invalid code or email");
        return false;
      }

      // Mock user data - in real app, this would come from backend
      const mockUser: User = {
        id: isNewUser ? `new-${Date.now()}` : "existing-1",
        email,
        firstName: isNewUser ? "New" : "John",
        lastName: isNewUser ? "User" : "Doe",
      };

      console.log("OTP verification successful, setting user:", mockUser);

      // Update the state
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log("Auth state updated, isAuthenticated should now be true");

      // Store in localStorage for persistence
      localStorage.setItem("auth-user", JSON.stringify(mockUser));

      // Clean up OTP data
      localStorage.removeItem("otp-code");
      localStorage.removeItem("otp-email");
      localStorage.removeItem("otp-is-new-user");

      return true;
    } catch (error) {
      console.error("OTP verification failed:", error);
      return false;
    }
  },
}));
