import React, { useState, useRef, useEffect } from 'react';
import { 
  updateNoteTitle, updateNoteContent, addTag, 
  updateTag, removeTag, deleteDocument 
} from '../FirebaseHandler';
import Popup from './Popup';
import styles from '../page.module.css';
import { NoteProps } from './Note';
import { DeleteIcon, TagIcon, CancelIcon, AddTagIcon } from '../assets/Icons';


export default function NotePopup(props: NoteProps) {
  const [content, setContent] = useState(props.note.content);
  const [title, setTitle] = useState(props.note.title);
  const [tags, setTags] = useState(props.note.tags);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    await updateNoteContent(props.note.id, e.target.value);
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  };

  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(titleTextareaRef);
    adjustTextareaHeight(contentTextareaRef);
  }, [title, content]);

  return (
    <div key={props.note.id}>
      <Popup
        handleClose={props.handleClose}
        content={
          <div className={styles.notePopupContainer}>
            <textarea 
              ref={titleTextareaRef}
              className={styles.popupNoteTitle} 
              value={title} 
              onChange={handleTitleChange} />
            <textarea
              ref={contentTextareaRef}
              value={content}
              onChange={handleContentChange}
            />

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
                onClick={() => { deleteDocument(props.note.id, 'note'); props.handleClose(); }}
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
        }
      />
    </div>
  );
}
