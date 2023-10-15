import { 
  getAllNotes, getAllTodos, 
  addTodo, addNote, subscribeToNotesChanges, subscribeToTodosChanges, 
} from "../FirebaseHandler";
import React, { useEffect, useState } from "react";
import styles from '../page.module.css';
import Note from './Note';
import Todo from './Todo';
import { Note as TNote, Todo as TTodo } from "../types";
import NotePopup from "./NotePopup";
import TodoPopup from "./TodoPopup";
import { NoteIcon, TodoIcon } from "../assets/Icons";

export default function Main() : JSX.Element {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [selectedItem, setSelectedItem] = useState<TNote | TTodo | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(()=> {
    async function loadNotes() {
      const notes = await getAllNotes();
      setNotes(notes);
    };
    async function loadTodos() {
      const todos = await getAllTodos();
      setTodos(todos);
    };

    const unsubscribeFromNotes = subscribeToNotesChanges((updatedNotes) => {
      setNotes(updatedNotes);
    });
    const unsubscribeFromTodos = subscribeToTodosChanges((updatedTodos) => {
      setTodos(updatedTodos);
    })

    loadNotes();
    loadTodos();

    return () => {
      unsubscribeFromNotes(); // Unsubscribe from the snapshot listener when component unmounts
      unsubscribeFromTodos();
    }
  }, []);
  
  // Combine notes and todos into a single array
  const combinedArray: (TNote | TTodo)[] = [...notes, ...todos];

  // Sort the combined array by the updatedAt date in descending order
  const sortedArray = combinedArray.sort((a, b) => {
    const bUpdatedAt = b.updatedAt.toMillis();
    const aUpdatedAt = a.updatedAt.toMillis();
    return bUpdatedAt - aUpdatedAt;
  });

    // Function to handle opening a note or todo as a popup
    const handleOpenPopup = (item: TNote | TTodo) => {
      setSelectedItem(item);
      setShowPopup(true);
      document.body.classList.add(styles.popupOpen);
    };
  
    // Function to close the popup
    const handleClosePopup = () => {
      setSelectedItem(null);
      setShowPopup(false);
      document.body.classList.remove(styles.popupOpen);
    };


  return (
    <div className={styles.main}>
      <div className={styles.addButtonsContainer}>
        <button className={styles.addButton} onClick={() => addNote("Title", "Note") }>
          
          <NoteIcon 
            className={styles.NavIcon}
            width={30}
            height={30}
          />
          <p>Add note</p>
        </button>

        <button className={styles.addButton} onClick={() => addTodo("Title", "Todo")}>
          
          <TodoIcon 
            className={styles.NavIcon}
            width={30}
            height={30}
          />
          <p>Add todo</p>
        </button>
      </div>
      


      <div className={styles.grid}>
        {sortedArray.map((item) => {
        if ('content' in item) {
          return (
          <Note 
            key={item.id}
            note={item}
            handleOpenPopup={handleOpenPopup}
            handleClose={handleClosePopup}
          />
          );
          } else {
            return (
              <Todo 
                key={item.id}
                todo={item}
                handleOpenPopup={handleOpenPopup}
                handleClose={handleClosePopup}
              />
            )
          }
        })}
      </div>  

      {showPopup && selectedItem && 'content' in selectedItem && (
        <NotePopup
          note={selectedItem}
          handleOpenPopup={handleOpenPopup}
          handleClose={handleClosePopup}
        />
      )}
      {showPopup && selectedItem && 'subtask' in selectedItem && (
        <TodoPopup
          todo={selectedItem}
          handleOpenPopup={handleOpenPopup}
          handleClose={handleClosePopup}
        />
      )}
    </div>
  )
}