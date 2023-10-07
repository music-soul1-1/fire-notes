import { Timestamp } from "firebase/firestore";

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPinned: boolean;
};

export type Todo = {
  id: string;
  title: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPinned: boolean;
  subtask: {
    text: string;
    completed: boolean;
    completedAt: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }[];
};