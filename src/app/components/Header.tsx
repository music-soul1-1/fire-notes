import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import { signInWithGoogle, clearStorage } from '../FirebaseHandler';
import FireNotesLogo from './lockup.svg';
import Image from 'next/image';
import { AccountIcon, SettingsIcon } from '../assets/Icons';
import Popup from './Popup';

export default function Header(): JSX.Element {
  const [isSettingsPopupOpen, setSettingsPopupOpen] = useState(false);

  function toggleSettingsPopup() {
    setSettingsPopupOpen(!isSettingsPopupOpen);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLeftContainer}>
        <Image 
          alt='Fire Notes logo'
          unoptimized
          src={require('../assets/app-icons/fire-notes-logo.png')}
          width={60}
          height={60}
          className={styles.headerLogo}
        />
        <p className={styles.headerTitle}>FireNotes</p>
      </div>

      <div className={styles.headerRightButtonsContainer}>
        <button className={styles.iconButton} onClick={() => toggleSettingsPopup()}>
          <SettingsIcon
            alt='Settings'
            width={28}
            height={28}
            className={styles.settingsLogo}
          />
        </button>
        <button className={styles.iconButton}>
          <AccountIcon
            alt='Account pic'
            width={50}
            height={50}
            className={styles.accountPic}
            onClick={() => {signInWithGoogle()}}
          />
        </button>
      </div>

      {isSettingsPopupOpen &&
        <Popup 
          content={
            <div className={styles.popupContent}>
              <p>~Settings coming soon~</p>
              <button className={styles.roundedButton} onClick={() => {clearStorage(); location.reload()}}>
                Clear local storage
              </button>
              <p>(you will need to login again)</p>
            </div>
            
          }
          handleClose={() => toggleSettingsPopup()}
        />
      }
    </header>
  )
}
