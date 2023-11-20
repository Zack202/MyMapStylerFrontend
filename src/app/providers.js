'use client';

import AuthContext, { AuthContextProvider } from "./auth";

export function Providers({ children }) {
  return (
    <AuthContextProvider>{children}</AuthContextProvider>
  );
}