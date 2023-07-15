import React from 'react';
import styles from '../page.module.css';
import { CancelIcon } from '../assets/Icons';

export type popupProps = {
  content: JSX.Element,
  handleClose: any,
  hideCloseButton?: true
};

export default function Popup(props : popupProps) {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupBackground} onClick={props.handleClose} />

      <div className={styles.popupInnerWindow}>
        {!props.hideCloseButton ? (
          <button className={styles.popupCloseButton} onClick={props.handleClose}>
            <CancelIcon 
              alt='Close'
              width={40}
              height={40}
              fill={'#1A5986'}
            />
          </button>
        ) : null}
        
        {props.content}
      </div>
      
    </div>
    
  )
}