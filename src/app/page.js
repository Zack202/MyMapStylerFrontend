import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        MyMapStyler
      </div>
      <button className={styles.button}>Login</button>
      <button className={styles.button}>Create Account</button>

    </main>
  )
}
