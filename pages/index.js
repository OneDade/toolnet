import React from 'react';
import Navbar from '../components/Navbar';
import UnifiedTool from '../components/UnifiedTool';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>达德在线工具</h2>
        <div className={styles.contentArea}>
          <UnifiedTool />
        </div>
      </main>
      <Footer />
    </div>
  );
} 