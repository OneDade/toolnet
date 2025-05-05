import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <section className={styles.footerSection}>
            <h2 className={styles.footerTitle}>关于我们</h2>
            <p className={styles.footerText}>
              达德工具站提供高效、便捷的在线工具，帮助用户提高工作效率。
            </p>
          </section>
          
          <section className={styles.footerSection}>
            <h2 className={styles.footerTitle}>联系方式</h2>
            <address className={styles.footerAddress}>
              <p>Email: <a href="mailto:contact@dadetool.xyz">contact@dadetool.xyz</a></p>
            </address>
          </section>
          
          <section className={styles.footerSection}>
            <h2 className={styles.footerTitle}>快速链接</h2>
            <nav className={styles.footerNav}>
              <ul className={styles.footerLinks}>
                <li><a href="http://dade2022.99kami.com" target="_blank" rel="noopener noreferrer">会员购买</a></li>
                <li><a href="http://dade2017.ugfkw.com/" target="_blank" rel="noopener noreferrer">瓶盖购买</a></li>
              </ul>
            </nav>
          </section>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© {currentYear} 达德网络 版权所有</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 