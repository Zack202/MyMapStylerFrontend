'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import api from './api'

import { CreateAccountScreen } from './components'
import { MapEditingScreen } from './components'


export default function Home() {

  const [names, setNames] = useState('')
  const [name, setName] = useState('')

  const handleAddName = async () => {
    console.log("Handle add name", name)
    if (name == '') {
      return
    }else{
    const result = await api.createNewName(name)
    console.log(result)
    setName('')
    document.getElementById("nameinput").value = "";
    //handleGetNames()
    }
  }

  const handleGetNames = async () => {
    const result = await api.getNames()
    const nameList = result.data.data.map(item => item.name);
    console.log(nameList)
    const namesWithCommas = nameList.join(', ');
    setNames(namesWithCommas)
  }

  
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        MyMapStyler
      </div>
      <button className={styles.button}>Login</button>
      <button className={styles.button}>Create Account</button>

      <input id="nameinput" className={styles.input} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name"></input>
      <button className={styles.button} onClick={handleAddName}>Submit Name</button>
      <h2 className={styles.h2}>All names: {names}</h2>
      <button className={styles.button} onClick={handleGetNames}>Refresh all names from db</button>

    </main>
  )
}
