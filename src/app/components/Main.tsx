import { 
  getAllNotes, getAllTodos, note, todo, 
  addTodo, addNote, updateNoteContent, updateNoteTitle, 
  subscribeToNotesChanges, subscribeToTodosChanges, loadUid,
  updateTodoSubtask, updateTodoTitle, deleteDocument, addTag, 
  updateTag, removeTag
} from "../FirebaseHandler";
import React, { useEffect, useState } from "react";
import styles from '../page.module.css';
import Note from './Note';
import Todo from './Todo';
import { Timestamp } from "firebase/firestore";

export default function Main() : JSX.Element {
  const [notes, setNotes] = useState<note[]>([]);
  const [todos, setTodos] = useState<todo[]>([]);

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

  // TODO: Refactor these functions:
  async function handleContentChange(id: string, value: string, type: 'note' | 'todo', index? : number) {
    if (type === 'note') {
      setNotes(prevNotes => prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, content: value };
        }
        return note;
      }));
  
      await updateNoteContent(id, value);
    }
    else if (index || index == 0) {
      setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id == id) {
          return { 
            ...todo,
            subtask: todo.subtask.map((desc, i) => (i === index ? value : desc)) 
          };
        }
        return todo;
      }));
  
      await updateTodoSubtask(id, index, value);
    }
  };

  async function handleTitleChange(id: string, value: string, type: 'note' | 'todo') {
    if (type === 'note') {
      setNotes(prevNotes => prevNotes.map(note => {
        if (note.id === id) {
          return { 
            ...note, 
            title: value 
          };
        }
        return note;
      }));
  
      await updateNoteTitle(id, value);
    }
    else {
      setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id == id) {
          return { 
            ...todo,
            title: value
          };
        }
        return todo;
      }));
  
      await updateTodoTitle(id, value);
    }
  };

  async function handleTagUpdate(id: string, index: number, newValue: string, type: 'note' | 'todo') {
    if (type === 'note') {
      setNotes(prevTodos => prevTodos.map(note => {
        if (note.id == id) {
          return { 
            ...note,
            tags: note.tags.map((tag, i) => (i === index ? newValue : tag)) 
          };
        }
        return note;
      }));

      await updateTag(id, index, newValue, 'note');
    }
    else {
      setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id == id) {
          return { 
            ...todo,
            tags: todo.tags.map((tag, i) => (i === index ? newValue : tag)) 
          };
        }
        return todo;
      }));

      await updateTag(id, index, newValue, 'todo');
    }
  };
  
  // Combine notes and todos into a single array
  const combinedArray: (note | todo)[] = [...notes, ...todos];

  // Sort the combined array by the updatedAt date in descending order
  const sortedArray = combinedArray.sort((a, b) => {
    const bUpdatedAt = b.updatedAt.toMillis();
    const aUpdatedAt = a.updatedAt.toMillis();
    return bUpdatedAt - aUpdatedAt;
  });


  return (
    <div className={styles.main}>      
      {sortedArray.map((item) => {
      if ('content' in item) {
        return (
        <Note 
          key={item.id}
          note={item}
          handleContentChange={handleContentChange}
          handleTitleChange={handleTitleChange}
          handleTagUpdate={handleTagUpdate}
          addTag={addTag}
          removeTag={removeTag}
          deleteDocument={deleteDocument}
        />
        );
        } else {
          return (
            <Todo 
              key={item.id}
              todo={item}
              handleContentChange={handleContentChange}
              handleTitleChange={handleTitleChange}
              handleTagUpdate={handleTagUpdate}
              addTag={addTag}
              removeTag={removeTag}
              deleteDocument={deleteDocument}
            />
          )
        }
      })}

      <button onClick={() => addNote("test note", "test content") }>add note</button>
      <button onClick={() => addTodo("test", ["first todo", "second todo"]) }>add todo</button>
    </div>
  )
}