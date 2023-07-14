import React from "react";
import {todo, setCompleted, addSubtask, removeSubtask,} from '../FirebaseHandler';

type TodoProps = {
  todo: todo;
  handleTitleChange: (id: string, value: string, type: 'note' | 'todo') => void;
  handleContentChange: (id: string, value: string, type: 'note' | 'todo', index? : number) => void;
  handleTagUpdate:  (id: string, index: number, value: string, type: 'note' | 'todo') => void;
  removeTag: (id: string, index: number, type: 'note' | 'todo') => void;
  addTag: (id: string, tag: string, type: 'note' | 'todo') => void;
  deleteDocument: (id: string, type: 'todo' | 'note') => void;
};

export default function Note(props : TodoProps) {
  return (
    <div key={props.todo.id}>
      {props.todo.id} title:
      <input value={props.todo.title} onChange={(e) => props.handleTitleChange(props.todo.id, e.target.value, 'todo')}></input>
      {props.todo.description.map((val, index) => (
        <div key={index}>
          <p>{index}:</p>
          <input type="checkbox" checked={props.todo.completed[index]} onChange={() => setCompleted(props.todo.id, index, !props.todo.completed[index])}/>
          <input
            key={index}
            value={props.todo.description[index]}
            onChange={(e) => props.handleContentChange(props.todo.id, e.target.value, 'todo', index)}
          />
          <button style={{marginLeft: 10}} onClick={() => removeSubtask(props.todo.id, index)}>remove</button>
        </div>
        
      ))}
      <button style={{marginBottom: 30}} onClick={() => addSubtask(props.todo.id)}>+ add subtask</button>

      {Array.isArray(props.todo.tags) ? (
        props.todo.tags.map((val, index) => (
          <div key={index}>
            <input value={props.todo.tags[index]} onChange={(e) => props.handleTagUpdate(props.todo.id, index, e.target.value, 'todo')} />
            <button onClick={() => props.removeTag(props.todo.id, index, 'todo')}>remove tag</button>
          </div>
        ))
      ) : null}
      <button onClick={() => props.addTag(props.todo.id, '', 'todo')}>add tag</button>

      <button style={{marginLeft: 20}} onClick={() => props.deleteDocument(props.todo.id, 'todo')}>delete todo</button>
    </div>
  );
};