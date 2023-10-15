import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import { signInWithGoogle, clearStorage, getUserPicUrl } from '../FirebaseHandler';
import Image from 'next/image';
import { AccountIcon, SettingsIcon } from '../assets/Icons';
import Popup from './Popup';

export default function Header(): JSX.Element {
  const [isSettingsPopupOpen, setSettingsPopupOpen] = useState(false);
  const [userPicUrl, setUserPicUrl] = useState<string | undefined>();

  function toggleSettingsPopup() {
    setSettingsPopupOpen(!isSettingsPopupOpen);
  };

  useEffect(() => {
    async function getUserPic() {
      const userPic = await getUserPicUrl();
      setUserPicUrl(userPic);
    }
    getUserPic();
  }, []);

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
            className={styles.settingsIcon}
          />
        </button>
        <button className={styles.iconButton}>
          {userPicUrl ? (
            <Image 
              alt='User pic'
              unoptimized
              src={userPicUrl ?? ''}
              width={50}
              height={50}
              className={styles.accountPic}
              onClick={() => {signInWithGoogle()}}
            />
          ) : (
            <AccountIcon
              alt='Account pic'
              width={50}
              height={50}
              className={styles.accountPic}
              onClick={() => {signInWithGoogle()}}
            />
          )}
        </button>
      </div>

      {isSettingsPopupOpen &&
        <Popup 
          minWidth={500}
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
