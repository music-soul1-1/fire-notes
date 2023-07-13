import React, {useState} from "react";
import { signInWithGoogle } from "../FirebaseHandler";
import styles from '../page.module.css';
import Image from "next/image";

export default function LoginScreen() : JSX.Element {
  const [uidFound, setUidFound] = useState<boolean>(false);

  async function handleUid() {
    await signInWithGoogle();

    setUidFound(!uidFound);
  }
  
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupBackground} />
      <div className={styles.popupBackground} />
      <div className={styles.popupBackground} />
      
      <div className={styles.popupInnerWindow} style={{position: 'absolute'}}>
        <div className={styles.loginMenu}>
          <Image 
            alt='Fire Notes logo'
            unoptimized
            src={require('../assets/app-icons/fire-notes-logo.png')}
            width={80}
            height={80}
            style={{display: 'flex'}}
          />
          <p className={styles.headerTitle} style={{marginBottom: 40}}>FireNotes</p>
          <p>To use FireNotes, please login:</p>
          <button className={styles.roundedButton} onClick={() => handleUid()}>
            <p>Login with Google</p>
            <Image 
              alt="google icon"
              src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'}
              width={30}
              height={30}
              className={styles.googleIcon}
            />
          </button>
        </div>
      </div>
    </div>
  )
}