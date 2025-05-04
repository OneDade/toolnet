import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <svg className={styles.logoImage} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z" fill="currentColor"/>
          </svg>
          <h1 className={styles.siteTitle}>达德工具站</h1>
        </div>
        
        <div className={styles.navLinks}>
          <a 
            href="http://dade2022.99kami.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.navLink}
          >
            ➡️ 会员购买
          </a>
          <a 
            href="http://dade2017.ugfkw.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.navLink}
          >
            ➡️ 瓶盖购买
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 