import React from "react";
import {note, todo, deleteDocument, convertTimestampToString } from '../FirebaseHandler';
import styles from '../page.module.css';
import { DeleteIcon, TagIcon } from "../assets/Icons";

export type NoteProps = {
  note: note;
  handleOpenPopup: (item: note | todo) => void;
  handleClose: () => void;
};

export default function Note(props: NoteProps) {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Stop event propagation
    deleteDocument(props.note.id, "note");
  };

  return (
    <div
      key={props.note.id}
      onClick={() => props.handleOpenPopup(props.note)}
      className={styles.cardContainer}
    >
      <div className={styles.cardTextContainer}>
        <p className={styles.cardTitle}>{props.note.title}</p>
        <div className={styles.horizontalLine} ></div>
      </div>
      
      <div className={styles.cardTextContainer}>
        <p 
          className={styles.cardContent} 
          style={{fontSize: props.note.content.length >= 30 ? '0.9rem' : '1rem'}}
        >
          {props.note.content}
        </p>
      </div>

      <div className={styles.tagsContainer}>
        {Array.isArray(props.note.tags) && (
          <div className={styles.cardTagsContainer}>
            <TagIcon 
              alt={'tags: '}
              className={styles.tagIcon}
              width={20}
              height={20}
            />

            {props.note.tags.map((val, index) => (
              <span key={index} className={styles.cardTag}>
                {val}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className={styles.updatedAt}>Last updated at: {convertTimestampToString(props.note.updatedAt)}</p>

      <div className={styles.cardButtons}>
        <button
          className={styles.iconButton}
          onClick={handleDelete}
        >
          <DeleteIcon 
            title='Delete note'
            alt='delete note'
            width={30}
            height={30}
            className={styles.deleteButton}
          />
        </button>
      </div>
      
      
    </div>
  );
};
