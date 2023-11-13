'use client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";

import Link from "next/link"
import { CreateAccountScreen } from './components'

/*
  const router = createBrowserRouter([
    {
      path: "/",
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
      path: "/b",
      element: <MapEditingScreen/>
    },
    {
      path: "/f",
      element: <UserHomeScreenMapBrowsingScreenWrapper/>
    },
  ]);
  */

export default function Home() {
  
  return (
    <div>
      <Link href="/login">login,</Link>
      <Link href="/createAccount">     create account,</Link>
      <Link href="/profile">     profile,</Link>
      <Link href="/specificMap">     specfic map,</Link>
      <Link href="/mapEditing">     map editing,</Link>
      <Link href="/home_browser">     home/browser</Link>
    </div>
    
  )
}
