import React, { useState, useRef, useEffect } from 'react';
import { 
  updateTodoTitle, updateTodoSubtask, addTag, updateTag, 
  removeTag, setCompleted, addSubtask, removeSubtask, deleteDocument 
} from '../FirebaseHandler';
import Popup from './Popup';
import styles from '../page.module.css';
import { TodoProps } from './Todo';
import { DeleteIcon, TagIcon, CancelIcon, AddTagIcon, AddTaskIcon, CheckboxIconChecked, CheckboxIconOutline } from '../assets/Icons';
import { Timestamp } from 'firebase/firestore';


export default function TodoPopup(props: TodoProps) {
  const [subtasks, setSubtasks] = useState(props.todo.subtask);
  const [title, setTitle] = useState(props.todo.title);
  const [tags, setTags] = useState(props.todo.tags);
  const [todo, setTodo] = useState(props.todo);

  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function updateTodoData() {
      try {
        const updatedTodo = { ...todo, title: title, subtask: subtasks, tags: tags };
        //const newTodo = await updateTodo(updatedTodo);
        setTodo(updatedTodo);
      }
      catch (error) {
        console.error(error);
      }
    };
    
    updateTodoData();
  }, [title, subtasks, tags]);

  const handleSubtaskCompletion = async (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);

    await setCompleted(todo.id, index, updatedSubtasks[index].completed);
  };

  const handleSubtaskTextChange = async (index: number, text: string) => {
    const updatedSubtasks = [...subtasks];
    if (updatedSubtasks[index]) {
      updatedSubtasks[index].text = text;
      updatedSubtasks[index].updatedAt = Timestamp.fromDate(new Date());
      setSubtasks(updatedSubtasks);
      await updateTodoSubtask(todo.id, index, text);
    }
  };
  
  const handleSubtaskDelete = async (index: number) => {
    const updatedSubtasks = [...subtasks];
    if (updatedSubtasks[index]) {
      updatedSubtasks.splice(index, 1);
      setSubtasks(updatedSubtasks);
      await removeSubtask(todo.id, index);
    }
  };

  async function handleAddSubtask() {
    const initialSubtask = {
      text: '',
      completed: false,
      completedAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
    };
    const updatedSubtasks = [...subtasks, initialSubtask];
    setSubtasks(updatedSubtasks);

    await addSubtask(todo.id, '');
  };

  async function handleDeleteTodo() {
    await deleteDocument(todo.id, 'todo');
  };

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

                  <button className={styles.iconButton} onClick={() => handleSubtaskCompletion(index)} style={{padding: 5}}>
                    {val.completed ? (
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
                    value={subtasks[index].text}
                    onChange={(e) => handleSubtaskTextChange(index, e.target.value)}
                  />
                  <button className={styles.iconButton} onClick={() => handleSubtaskDelete(index)} style={{padding: 2}}>
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
                <button className={styles.iconButton} onClick={() => handleAddSubtask()}>
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
