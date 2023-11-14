'use client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";

import Link from "next/link"
import { CreateAccountScreen } from './components'

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
