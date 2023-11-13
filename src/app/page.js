'use client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginScreen, SplashScreen, ProfileScreen, SpecificMapScreen } from './components';
import React from "react";

import { CreateAccountScreen } from './components'


/*          <Route path="/CreateAccount" component= {CreateAccountScreen}/>
          <Route path="/Login" component= {LoginScreen}/>
          <Route path="/Profile" component= {ProfileScreen}/>
          <Route path="/HomeBrowse" component= {UHSBSW}/>
          <Route path="/map" component= {SpecificMapScreen}/>
          <Route path="/mapEditing" component= {MapEditingScreen}/>*/

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
      path: "/",
      element: <SpecificMapScreen/>
    },
  ]);

export default function Home() {
  
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  )
}
