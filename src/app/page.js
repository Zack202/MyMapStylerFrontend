'use client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SplashScreen } from './components';
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
      path: "/",
      element: <SplashScreen/>
    }
  ]);

export default function Home() {
  
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  )
}
