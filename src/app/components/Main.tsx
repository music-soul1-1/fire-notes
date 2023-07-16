import { 
  getAllNotes, getAllTodos, note, todo, 
  addTodo, addNote, subscribeToNotesChanges, subscribeToTodosChanges, 
  loadUid,
} from "../FirebaseHandler";
import React, { useEffect, useState } from "react";
import styles from '../page.module.css';
import Note from './Note';
import Todo from './Todo';
import { Timestamp } from "firebase/firestore";
import NotePopup from "./NotePopup";
import TodoPopup from "./TodoPopup";
import { NoteIcon, TodoIcon } from "../assets/Icons";

export default function Main() : JSX.Element {
  const [notes, setNotes] = useState<note[]>([]);
  const [todos, setTodos] = useState<todo[]>([]);
  const [selectedItem, setSelectedItem] = useState<note | todo | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(()=> {
    loadUid();
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
  const combinedArray: (note | todo)[] = [...notes, ...todos];

  // Sort the combined array by the updatedAt date in descending order
  const sortedArray = combinedArray.sort((a, b) => {
    const bUpdatedAt = b.updatedAt.toMillis();
    const aUpdatedAt = a.updatedAt.toMillis();
    return bUpdatedAt - aUpdatedAt;
  });

    // Function to handle opening a note or todo as a popup
    const handleOpenPopup = (item: note | todo) => {
      setSelectedItem(item);
      setShowPopup(true);
    };
  
    // Function to close the popup
    const handleClosePopup = () => {
      setSelectedItem(null);
      setShowPopup(false);
    };


  return (
    <div className={styles.main}>
      <div className={styles.addButtonsContainer}>
        <button className={styles.addButton} onClick={() => addNote("title", "note content") }>
          
          <NoteIcon 
            className={styles.NavIcon}
            width={30}
            height={30}
          />
          <p>Add note</p>
        </button>

        <button className={styles.addButton} onClick={() => addTodo("title", ["first todo", "second todo"])}>
          
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