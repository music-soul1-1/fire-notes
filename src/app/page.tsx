'use client' // this ensures that this will be rendered client-side

import styles from './page.module.css'
import { loadUid } from './FirebaseHandler'
import { useEffect, useState } from 'react'
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LoginScreen from './components/LoginScreen';
import Popup from './components/Popup';
import { GithubLogo, FirebaseIcon, VercelLogo, NextJSLogo } from './assets/Icons';

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

          {/* Copyright */}
          <div className={styles.copyrightContainer}>
            <a href='https://github.com/music-soul1-1/fire-notes' target='_blank'>
              <p>Visit GitHub</p>
              <GithubLogo 
                alt='GitHub'
                width={30}
                height={30}
                fill="#fff"
              />
            </a>

            <a href='https://nextjs.org/' target='_blank'>
              <p>Built with </p>
              <NextJSLogo 
                alt='NextJS'
                width={90}
                height={30}
              />
            </a>

            <a href='https://firebase.google.com/' target='_blank'>
              <p>Powered by </p>
              <FirebaseIcon 
                alt='Firebase'
                width={120}
                height={30}
              />
            </a>

            <a href='https://vercel.com/'  target='_blank'>
              <p>Hosted on </p>
              <VercelLogo
                alt='Vercel'
                width={90}
                height={30}
                fill="#fff"
              />
            </a>
            <div>
              <a  href='https://github.com/music-soul1-1/' target='_blank'>
                © music-soul1-1, 2023
              </a>
            </div>
            <div>
              <a  href='https://github.com/music-soul1-1/fire-notes/blob/main/LICENSE.txt' target='_blank'>
                MIT License
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
