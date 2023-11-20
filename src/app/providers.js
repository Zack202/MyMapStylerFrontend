'use client';

import GlobalStoreContext, { GlobalStoreContextProvider } from "./store";
import AuthContext, { AuthContextProvider } from "./auth";
export function Providers({ children }) {
  return (
    <AuthContextProvider><GlobalStoreContextProvider>{children}</GlobalStoreContextProvider></AuthContextProvider>
  );
}