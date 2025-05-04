import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z" fill="currentColor"/>
          </svg>
          <h1 className={styles.title}>达德工具站</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 