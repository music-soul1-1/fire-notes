'use client' // this ensures that this will be rendered client-side

import styles from './page.module.css'
import { loadUid } from './FirebaseHandler'
import { useEffect, useState } from 'react'
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LoginScreen from './components/LoginScreen';
import Popup from './components/Popup';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [uidFound, setUidFound] = useState<boolean>(false);

  useEffect(() => {
    setUidFound(loadUid());
    setLoading(false);
  }, []);

  if (isLoading) return <Popup content={<p style={{margin: 30}}>Loading...</p>} handleClose={() => {}} hideCloseButton />;
  
  return (
    <div className={styles.bodyContainer}>
      {!uidFound ? (
        <LoginScreen />
      ) : (
        <div>
          <Header />
          <Navigation />
          <Main />
        </div>
      )}
    </div>
  );
}
