import React, { useState } from 'react';
import { 
  note, updateNoteTitle, updateNoteContent, addTag, 
  updateTag, removeTag, deleteDocument 
} from '../FirebaseHandler';
import Popup from './Popup';
import { Timestamp } from "firebase/firestore";
import styles from '../page.module.css';
import { NoteProps } from './Note';


export default function NotePopup(props: NoteProps) {
  const [content, setContent] = useState(props.note.content);
  const [title, setTitle] = useState(props.note.title);
  const [tags, setTags] = useState(props.note.tags);

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    await updateNoteContent(props.note.id, e.target.value);
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    await updateNoteTitle(props.note.id, e.target.value);
  };

  const handleAddTag = async (value: string) => {
    const updatedTags = tags ? [...tags, value] : [value];
    setTags(updatedTags);
    await addTag(props.note.id, value, 'note');
  };

  const handleUpdateTag = async (newValue: string, index: number, ) => {
    const updatedTags = tags.map((tag, i) => (i === index ? newValue : tag));
    setTags(updatedTags);
    await updateTag(props.note.id, index, newValue, 'note');
  };

  const handleTagDelete = async (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    await removeTag(props.note.id, index, 'note')
  }

  return (
    <div key={props.note.id}>
      <Popup
        handleClose={props.handleClose}
        content={
          <div>
            <p>Popup content for item ID: {props.note.id}</p>
            <input value={title} onChange={handleTitleChange} />
            <textarea
              value={content}
              onChange={handleContentChange}
            />
            {Array.isArray(tags) ? tags.map((tag, index) => (
              <div key={index}>
                <input value={tag} onChange={(e) => handleUpdateTag(e.target.value, index)} />
                <button onClick={() => handleTagDelete(index)}>delete tag</button>
              </div>
            )) : null}
            <button onClick={() => handleAddTag('')}>Add new tag</button>
            <button onClick={() => { deleteDocument(props.note.id, 'note'); props.handleClose(); }}>Delete todo</button>
          </div>
        }
      />
    </div>
  );
}
