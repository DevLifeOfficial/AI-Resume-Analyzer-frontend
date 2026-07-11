"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { GET_CURRENT_USER, LOGOUT_MUTATION } from "@/GraphQL/graphql";
import { apolloClient } from "@/GraphQL/apollo";
import type { ProfileUser } from "@/lib/types/profile.type";

interface AuthContextType {
  user: ProfileUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  refreshUser: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);

      const { data } = await apolloClient.query<{
        getCurrentUser: ProfileUser;
      }>({
        query: GET_CURRENT_USER,
        fetchPolicy: "network-only",
      });

      if (data?.getCurrentUser) {
        setUser(data.getCurrentUser);
        setError(null);
      } else {
        setUser(null);
        setError(null);
      }
    } catch (err) {
      setUser(null);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apolloClient.mutate({
        mutation: LOGOUT_MUTATION,
      });
      setUser(null);
      setError(null);
    } catch (error) {
      setError(error as Error);
      console.error(error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}