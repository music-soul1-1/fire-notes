import React, { useState } from 'react';
import { 
  updateTodoTitle, updateTodoSubtask, addTag, updateTag, 
  removeTag, setCompleted, addSubtask, removeSubtask, deleteDocument 
} from '../FirebaseHandler';
import Popup from './Popup';
import { Timestamp } from "firebase/firestore";
import styles from '../page.module.css';
import { TodoProps } from './Todo';


export default function TodoPopup(props: TodoProps) {
  const [subtasks, setSubtasks] = useState(props.todo.subtask);
  const [title, setTitle] = useState(props.todo.title);
  const [tags, setTags] = useState(props.todo.tags);
  const [completed, setSubtaskCompleted] = useState(props.todo.completed);


  const handleSubtaskChange = async (newValue: string, index: number) => {
    const newSubtasks = subtasks.map((subtask, i) => (i === index ? newValue : subtask));
    
    setSubtasks(newSubtasks);
    await updateTodoSubtask(props.todo.id, index, newValue);
  };

  const handleAddSubtask = async (initValue: string) => {
    if (subtasks.length >= 1) {
      setSubtasks([...subtasks, initValue]);
    }
    else {
      setSubtasks([initValue]);
    }

    await addSubtask(props.todo.id);
  };

  const handleRemoveSubtask = async (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);

    setSubtasks(newSubtasks);
    await removeSubtask(props.todo.id, index);
  }

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    await updateTodoTitle(props.todo.id, e.target.value);
  };

  const handleAddTag = async (value: string) => {
    const updatedTags = tags ? [...tags, value] : [value];
    setTags(updatedTags);
    await addTag(props.todo.id, value, 'todo');
  };

  const handleUpdateTag = async (newValue: string, index: number, ) => {
    const updatedTags = tags.map((tag, i) => (i === index ? newValue : tag));
    setTags(updatedTags);
    await updateTag(props.todo.id, index, newValue, 'todo');
  };

  const handleTagDelete = async (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    await removeTag(props.todo.id, index, 'todo')
  };

  const handleCompletionChange = async (index: number, value: boolean) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = value;
    setSubtaskCompleted(updatedCompleted);

    await setCompleted(props.todo.id, index, value);
  };
  

  return (
    <div key={props.todo.id}>
      <Popup
        isTodo
        handleClose={props.handleClose}
        content={
          <div>
            <p>Popup content for item ID: {props.todo.id}</p>
            <input value={title} onChange={handleTitleChange} />

            {Array.isArray(subtasks) ? subtasks.map((val, index) => (
              <div key={index}>
                <p>{index}:</p>
                <input type="checkbox" checked={completed[index]} onChange={() => handleCompletionChange(index, !completed[index])}/>
                <textarea
                  key={index}
                  value={subtasks[index]}
                  onChange={(e) => handleSubtaskChange(e.target.value, index)}
                />
                <button style={{marginLeft: 10}} onClick={() => handleRemoveSubtask(index)}>remove subtask</button>
              </div>
              
            )) : null }
            <button style={{marginBottom: 30}} onClick={() => handleAddSubtask('')}>+ add subtask</button>

            {Array.isArray(tags) ? tags.map((tag, index) => (
              <div key={index}>
                <input value={tag} onChange={(e) => handleUpdateTag(e.target.value, index)} />
                <button onClick={() => handleTagDelete(index)}>delete tag</button>
              </div>
            )) : null }
            <button onClick={() => handleAddTag('')}>Add new tag</button>
            <button onClick={() => { deleteDocument(props.todo.id, 'todo'); props.handleClose(); }}>Delete todo</button>

          </div>
        }
      />
    </div>
  );
}
