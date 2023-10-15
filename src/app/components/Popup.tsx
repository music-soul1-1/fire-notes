import React from 'react';
import styles from '../page.module.css';
import { CancelIcon } from '../assets/Icons';

export type popupProps = {
  content: JSX.Element,
  handleClose: any,
  hideCloseButton?: true,
  isTodo?: true,
  minWidth?: number,
};

export default function Popup(props : popupProps) {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupBackground} onClick={props.handleClose} />

      <div 
        className={`
        ${styles.popupInnerWindow} 
        ${props.isTodo ? styles.todoPopupInnerWindow : ''}`} 
        style={{minWidth: props.minWidth}}
      >
        {!props.hideCloseButton ? (
          <button 
            className={styles.popupCloseButton}
            title='Close'
            onClick={props.handleClose}>
            <CancelIcon 
              alt='Close'
              width={40}
              height={40}
              fill={'#1a689f'}
            />
          </button>
        ) : null}
        
        {props.content}
      </div>
      
    </div>
    
  )
}