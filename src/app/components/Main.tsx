import { 
  getAllNotes, getAllTodos, note, todo, 
  addTodo, addNote, updateNoteContent, updateNoteTitle, 
  subscribeToNotesChanges, subscribeToTodosChanges, loadUid,
  updateTodoDescription, updateTodoTitle, addSubtask, removeSubtask,
  setCompleted, deleteDocument, addTag, updateTag, removeTag
} from "../FirebaseHandler";
import React, { useEffect, useState } from "react";
import styles from '../page.module.css';

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

  async function handleNoteContentChange(id: string, value: string) {
    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === id) {
        return { ...note, content: value };
      }
      return note;
    }));

    await updateNoteContent(id, value);
  };

  async function handleNoteTitleChange(id: string, value: string) {
    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === id) {
        return { ...note, title: value };
      }
      return note;
    }));

    await updateNoteTitle(id, value);
  };

  async function handleTodoDescriptionChange(id: string, index: number, value: string) {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id == id) {
        return { 
          ...todo,
          description: todo.description.map((desc, i) => (i === index ? value : desc)) 
        };
      }
      return todo;
    }));

    await updateTodoDescription(id, index, value);
  };

  async function handleTodoTitleChange(id: string, value: string) {
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
  }

  return (
    <div className={styles.main}>
      <p>Notes:</p>
      
      {notes.map((note) => (
        <div key={note.id}>
          {note.id}:
          <input value={note.title} onChange={(e) => handleNoteTitleChange(note.id, e.target.value)} />:
          <input value={note.content} onChange={(e) => handleNoteContentChange(note.id, e.target.value)} />
          {Array.isArray(note.tags) ? (
            note.tags.map((val, index) => (
              <div key={index}>
                <input value={note.tags[index]} onChange={(e) => handleTagUpdate(note.id, index, e.target.value, 'note')} />
                <button onClick={() => removeTag(note.id, index, 'note')}>remove tag</button>
              </div>
            ))
          ) : null}
          <button onClick={() => addTag(note.id, '', 'note')}>add tag</button>
          <button style={{marginLeft: 20}} onClick={() => deleteDocument(note.id, 'note')}>delete note</button>
        </div>
      ))}

      <button onClick={() => addNote("test note", "test content") }>add note</button>


      <p>Todos:</p>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id} title:
          <input value={todo.title} onChange={(e) => handleTodoTitleChange(todo.id, e.target.value)}></input>
          {todo.description.map((val, index) => (
            <div key={index}>
              <p>{index}:</p>
              <input type="checkbox" checked={todo.completed[index]} onChange={() => setCompleted(todo.id, index, !todo.completed[index])}/>
              <input
                key={index}
                value={todo.description[index]}
                onChange={(e) => handleTodoDescriptionChange(todo.id, index, e.target.value)}
              />
              <button style={{marginLeft: 10}} onClick={() => removeSubtask(todo.id, index)}>remove</button>
            </div>
            
          ))}
          <button style={{marginBottom: 30}} onClick={() => addSubtask(todo.id)}>+ add subtask</button>

          {Array.isArray(todo.tags) ? (
            todo.tags.map((val, index) => (
              <div key={index}>
                <input value={todo.tags[index]} onChange={(e) => handleTagUpdate(todo.id, index, e.target.value, 'todo')} />
                <button onClick={() => removeTag(todo.id, index, 'todo')}>remove tag</button>
              </div>
            ))
          ) : null}
          <button onClick={() => addTag(todo.id, '', 'todo')}>add tag</button>

          <button style={{marginLeft: 20}} onClick={() => deleteDocument(todo.id, 'todo')}>delete todo</button>
        </div>
      ))}
      <button onClick={() => addTodo("test", ["first todo", "second todo"]) }>add todo</button>
    </div>
  )
}