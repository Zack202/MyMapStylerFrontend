import styles from './MapEditingScreen.module.css';
import MapEditor from './MapEditor';





export default function MapEditingScreen() {
    return(
        <div className={styles.container}>
            <MapEditor />
        </div>
    )
}