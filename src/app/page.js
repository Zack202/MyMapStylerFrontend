'use client'
import styles from './page.module.css'
import { useState } from 'react'
import api from './api'
import TopAppBanner from './components/TopAppBanner'
import BottomAppBanner from './components/BottomAppBanner'
import { BrowserRouter } from 'react-router-dom'
import CreateMapModal from './components/CreateMapModal'
import MapCard from './components/MapCard'
import LeafletMapContainer from './components/LeafletMapContainer'
import EditToolbar from './components/EditToolbar'


export default function Home() {
  
  return (
    <BrowserRouter>
      <TopAppBanner />
      <EditToolbar />
      <BottomAppBanner />
    </BrowserRouter>
  )
}
