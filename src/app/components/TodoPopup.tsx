import React, { useState, useRef, useEffect } from 'react';
import { 
  updateTodoTitle, updateTodoSubtask, addTag, updateTag, 
  removeTag, setCompleted, addSubtask, removeSubtask, deleteDocument 
} from '../FirebaseHandler';
import Popup from './Popup';
import styles from '../page.module.css';
import { TodoProps } from './Todo';
import { DeleteIcon, TagIcon, CancelIcon, AddTagIcon, AddTaskIcon, CheckboxIconChecked, CheckboxIconOutline } from '../assets/Icons';


export default function TodoPopup(props: TodoProps) {
  const [subtasks, setSubtasks] = useState(props.todo.subtask);
  const [title, setTitle] = useState(props.todo.title);
  const [tags, setTags] = useState(props.todo.tags);
  const [completed, setSubtaskCompleted] = useState(props.todo.completed);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);


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

  const handleTitleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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


  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(titleTextareaRef);
  }, [title]);
  

  return (
    <div key={props.todo.id}>
      <Popup
        isTodo
        handleClose={props.handleClose}
        content={
          <div>
            <div className={styles.notePopupContainer}>
              <textarea 
                ref={titleTextareaRef}
                className={styles.popupNoteTitle} 
                style={{marginBottom: 30}}
                value={title} 
                onChange={handleTitleChange} />

              {Array.isArray(subtasks) ? subtasks.map((val, index) => (
                <div key={index} className={styles.popupSubtasksContainer}>

                  <button className={styles.iconButton} onClick={() => handleCompletionChange(index, !completed[index])}>
                    {completed[index] ? (
                        <CheckboxIconChecked 
                        className={styles.icon}
                        alt='checked'
                        width={25}
                        height={25}
                      />
                      
                    ) : (
                        <CheckboxIconOutline 
                          className={styles.icon}
                          alt='not checked'
                          width={25}
                          height={25}
                        />
                    )}
                  </button>
                  
                  <textarea
                    key={index}
                    value={subtasks[index]}
                    onChange={(e) => handleSubtaskChange(e.target.value, index)}
                  />
                  <button className={styles.iconButton} onClick={() => handleRemoveSubtask(index)}>
                    <CancelIcon 
                      title='Remove subtask'
                      alt="remove subtask"
                      width={25}
                      height={25}
                    />
                  </button>
                </div>
                
              )) : null }
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, marginTop: 15, justifyContent: 'center'}}>
                <button className={styles.iconButton} onClick={() => handleAddSubtask('')}>
                  <AddTaskIcon 
                    alt="add subtask"
                    width={30}
                    height={30}
                    className={styles.addSubtaskIcon}
                  />
                </button>
                <p>👈Add subtask</p>
              </div>

              {/* Tags */}
              <div className={styles.tagsContainer}>
                {Array.isArray(tags) && (
                  <div className={styles.cardTagsContainer}>
                    <TagIcon 
                      alt={'tags: '}
                      className={styles.tagIcon}
                      width={20}
                      height={20}
                    />

                    {tags.map((tag, index) => (
                      <div key={index} className={styles.popupTagsContainer}>
                      <div style={{display: 'flex'}}>
                        <input value={tag} onChange={(e) => handleUpdateTag(e.target.value, index)} />
                        <button className={styles.iconButton} onClick={() => handleTagDelete(index)}>
                          <CancelIcon 
                            title='Remove tag'
                            alt='remove tag'
                            width={20}
                            height={20}
                            className={styles.tagRemoveIcon}
                          />
                        </button>
                      </div>
                    </div>
                    ))}
                  </div>
                )}
              </div>


              <div className={styles.cardButtons}>
                <button 
                  className={styles.iconButton} 
                  onClick={() => handleAddTag('')}>
                  
                  <AddTagIcon 
                    alt='+'
                    width={30}
                    height={30}
                    className={styles.addTagButton}
                  />
                </button>
                <button
                  className={styles.iconButton}
                  onClick={() => { deleteDocument(props.todo.id, 'todo'); props.handleClose(); }}
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
          </div>
        }
      />
    </div>
  );
}
