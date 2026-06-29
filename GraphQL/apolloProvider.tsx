"use client";

import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
    </AuthProvider>
  );
}