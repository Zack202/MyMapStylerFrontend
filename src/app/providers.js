'use client';

import GlobalStoreContext, { GlobalStoreContextProvider } from "./store";

export function Providers({ children }) {
  return (
    <GlobalStoreContextProvider>{children}</GlobalStoreContextProvider>
  );
}