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

interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    refreshUser: async () => {},
    logout: async () => {},
  });

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);

      const { data } =
        await apolloClient.query<{ getCurrentUser: User }>({
          query: GET_CURRENT_USER,
          fetchPolicy: "network-only",
        });

      if (data?.getCurrentUser) {
        setUser(data.getCurrentUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call your logout mutation here later
      await apolloClient.mutate({
        mutation: LOGOUT_MUTATION,
      });
      setUser(null);
    } catch (error) {
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