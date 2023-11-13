'use client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginScreen, SplashScreen, ProfileScreen, SpecificMapScreen, Leafletmap,  MapEditingScreen} from './components';
import React from "react";

import { CreateAccountScreen } from './components'


  const router = createBrowserRouter([
    {
      path: "/f",
      element: <SplashScreen/>
    },
    {
      path: "/d",
      element: <CreateAccountScreen/>
    },
    {
      path: "/a",
      element: <LoginScreen/>
    },
    {
      path: "/c",
      element: <ProfileScreen/>
    },
    {
      path: "/e",
      element: <SpecificMapScreen/>
    },
    {
      path: "/",
      element: <MapEditingScreen/>
    }
  ]);

export default function Home() {
  
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  )
}
