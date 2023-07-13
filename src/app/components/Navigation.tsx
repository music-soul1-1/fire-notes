import styles from '../page.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { NoteIcon, TagIcon, TodoIcon } from '../assets/Icons';

function NavButton(
  { label, onMouseEnter, onMouseLeave, isHovered, IconElement }: 
  { label: string; onMouseEnter: () => void; onMouseLeave: () => void; isHovered: boolean; IconElement: any }): JSX.Element {

  return (
    <button
      className={styles.NavTab}
      onMouseEnter={onMouseEnter} // Pass the onMouseEnter prop to the button element
      onMouseLeave={onMouseLeave}
    >
      <IconElement 
        className={styles.NavIcon}
        width={40}
        height={40}
        fill={isHovered ? '#B0D5F0' : '#1A5986'}
      />
      <p>{label}</p>
    </button>
  );
}

export default function Navigation(): JSX.Element {
  const [isHovered, setIsHovered] = useState([false, false, false, false]);

  const handleHover = (index : number, state : boolean) => {
    setIsHovered((array) => {
      array[index] = state;
      return [...array];
    })
  };

  return (
    <div className={styles.NavigationContainer}>

      <NavButton 
        IconElement={NoteIcon} 
        label='Notes & ToDos' 
        isHovered={isHovered[0]} 
        onMouseEnter={() => handleHover(0, true)} 
        onMouseLeave={() => handleHover(0, false)}
      />


      <NavButton 
        IconElement={NoteIcon} 
        label='All notes' 
        isHovered={isHovered[1]} 
        onMouseEnter={() => handleHover(1, true)} 
        onMouseLeave={() => handleHover(1, false)}
      />

      <NavButton 
        IconElement={TodoIcon} 
        label="All to-do's" 
        isHovered={isHovered[2]} 
        onMouseEnter={() => handleHover(2, true)} 
        onMouseLeave={() => handleHover(2, false)}
      />

      <NavButton 
        IconElement={TagIcon} 
        label='Coming soon' 
        isHovered={isHovered[3]} 
        onMouseEnter={() => handleHover(3, true)} 
        onMouseLeave={() => handleHover(3, false)}
      />
    </div>
  )
}
