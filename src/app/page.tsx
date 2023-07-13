'use client' // this ensures that this will be rendered clien-side

import styles from './page.module.css'
import { loadUid } from './FirebaseHandler'
import { useEffect, useState } from 'react'
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LoginScreen from './components/LoginScreen';

export default function Home() {
  const [uidFound, setUidFound] = useState<boolean>(false);

  useEffect(() => {
    findUid();
  }, []);

  useEffect(() => {
    findUid();
  }, [uidFound]);

  function findUid() {
    if (loadUid()) {
      setUidFound(true);
    }
    else {
      setUidFound(false);
    }
  };

  return (
    <div className='mybody'>
      {!uidFound ? 

      <LoginScreen /> : 

        <div>
          <Header />
          <Navigation />
          <Main />
        </div>
      }
    </div>
  )
}
