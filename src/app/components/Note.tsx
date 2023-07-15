import React from "react";
import {note, todo} from '../FirebaseHandler';
import NotePopup from "./NotePopup";

export type NoteProps = {
  note: note;
  handleTitleChange: (id: string, value: string, type: 'note' | 'todo') => void;
  handleContentChange: (id: string, value: string, type: 'note' | 'todo', index? : number) => void;
  handleTagUpdate:  (id: string, index: number, value: string, type: 'note' | 'todo') => void;
  removeTag: (id: string, index: number, type: 'note' | 'todo') => void;
  addTag: (id: string, tag: string, type: 'note' | 'todo') => void;
  deleteDocument: (id: string, type: 'todo' | 'note') => void;
  handleOpenPopup: (item: note | todo) => void;
  handleClose?: () => void;
};

export default function Note(props: NoteProps) {
  return (
    <div key={props.note.id} onClick={() => props.handleOpenPopup(props.note)}>
      <input
        value={props.note.title}
        onChange={(e) => props.handleTitleChange(props.note.id, e.target.value, 'note')}
      />:
      <textarea
        value={props.note.content}
        onChange={(e) => props.handleContentChange(props.note.id, e.target.value, 'note')}
      />
      <p>{props.note.updatedAt.toDate().toString()}</p>

      {Array.isArray(props.note.tags) &&
        props.note.tags.map((val, index) => (
          <div key={index}>
            <input
              value={props.note.tags[index]}
              onChange={(e) =>
                props.handleTagUpdate(props.note.id, index, e.target.value, "note")
              }
            />
            <button onClick={() => props.removeTag(props.note.id, index, "note")}>
              remove tag
            </button>
          </div>
        ))}

      <button onClick={() => props.addTag(props.note.id, "", "note")}>add tag</button>
      <button
        style={{ marginLeft: 20 }}
        onClick={() => props.deleteDocument(props.note.id, "note")}
      >
        delete note
      </button>
    </div>
  );
};
