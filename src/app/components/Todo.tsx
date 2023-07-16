import React from "react";
import {todo, deleteDocument, convertTimestampToString} from '../FirebaseHandler';
import styles from '../page.module.css';
import { CheckboxIconChecked, CheckboxIconOutline, DeleteIcon, TagIcon } from "../assets/Icons";

export type TodoProps = {
  todo: todo;
  handleOpenPopup: (item: todo) => void;
  handleClose: () => void;
};

export default function Todo(props : TodoProps) {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Stop event propagation
    deleteDocument(props.todo.id, "todo");
  };
  return (
    <div 
      key={props.todo.id} 
      onClick={() => props.handleOpenPopup(props.todo)} 
      className={`${styles.cardContainer} ${styles.todoContainer}`}
    >
      <div className={styles.cardTextContainer}>
        <p className={styles.cardTitle}>{props.todo.title}</p>
        <div className={styles.horizontalLine} ></div>
      </div>


      {Array.isArray(props.todo.subtask) &&  
        props.todo.subtask.map((val, index) => (
          <div key={index} className={styles.cardSubtaskContainer}>
            <div>
              {props.todo.completed[index] ? 
                <CheckboxIconChecked 
                  className={styles.icon}
                  alt='checked'
                  width={20}
                  height={20}
                /> :
                <CheckboxIconOutline 
                  className={styles.icon}
                  alt='not checked'
                  width={20}
                  height={20}
                />
              }
            </div>
            <div>
              <span 
                className={styles.cardContent} 
                style={{fontSize: props.todo.subtask[index].length >= 20 ? '0.85rem' : '1rem'}}
              >
                {props.todo.subtask[index].length >= 46
                  ? props.todo.subtask[index].substring(0, 45) + '...'
                  : props.todo.subtask[index]
                }
              </span>
            </div>
            
          </div>
      ))}

      <div className={styles.tagsContainer}>
        {Array.isArray(props.todo.tags) && (
          <div className={styles.cardTagsContainer}>
            <TagIcon 
              alt={'tags: '}
              className={`${styles.tagIcon} ${styles.todoTagIcon}`}
              width={20}
              height={20}
            />

            {props.todo.tags.map((val, index) => (
              <span key={index} className={`${styles.cardTag} ${styles.todoCardTag}`}>
                {val}
              </span>
            ))}
          </div>
        )}
      </div>
      

      <p className={`${styles.updatedAt} ${styles.todoUpdatedAt}`}>Last updated at: {convertTimestampToString(props.todo.updatedAt)}</p>

      <div className={styles.cardButtons}>
        <button
          className={styles.iconButton}
          onClick={handleDelete}
        >
          <DeleteIcon 
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