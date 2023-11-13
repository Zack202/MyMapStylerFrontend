'use client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginScreen, SplashScreen, ProfileScreen, SpecificMapScreen, Leafletmap,  MapEditingScreen, UserHomeScreenMapBrowsingScreenWrapper} from './components';
import React from "react";

import { CreateAccountScreen } from './components'



export default function Home() {
  
  return (
      <SplashScreen />
  )
}
