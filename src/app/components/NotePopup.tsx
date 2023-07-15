import React, { useState } from 'react';
import { note } from '../FirebaseHandler';
import Popup from './Popup';
import { Timestamp } from "firebase/firestore";
import styles from '../page.module.css';
import { NoteProps } from './Note';


export default function NotePopup(props: NoteProps) {
  const [content, setContent] = useState(props.note.content);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    props.handleContentChange(props.note.id, e.target.value, 'note');
  };

  return (
    <div key={props.note.id}>
      <Popup
        content={
          <div>
            <p>Popup content for item ID: {props.note.id}</p>
            <textarea
              value={content}
              onChange={handleContentChange}
            />
          </div>
        }
        handleClose={props.handleClose}
      />
    </div>
  );
}
