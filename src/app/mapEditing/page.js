'use client'
import { Edit } from '@mui/icons-material';
import styles from './MapEditingScreen.module.css';
import MapEditor from './MapEditor';
import TopAppBanner from '../Utils/TopAppBanner';
import BottomAppBanner from '../Utils/BottomAppBanner';
import EditToolbar from './EditToolbar';
import Leafletmap from './Leafletmap';
import { Grid } from '@mui/material';
import AuthContext from '../auth';

export default function MapEditingScreen() {
    const { auth } = useContext(AuthContext);

    if (!auth.loggedIn) {
        const router = useRouter();
        router.push('/login');
      }

    if (typeof window !== 'undefined') {
    return(
        <div className={styles.container}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <TopAppBanner />
                </Grid>
                <Grid item xs={3}>
                    <MapEditor />
                </Grid>
                <Grid item xs={9}>
                    <EditToolbar />
                    <Leafletmap />
                </Grid>
            </Grid>
            <BottomAppBanner />
        </div>
    )
    }else{
        return null
    }
};