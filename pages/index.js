import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TabSelector from '../components/TabSelector';
import QRCodeGenerator from '../components/QRCodeGenerator';
import URLExtractor from '../components/URLExtractor';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('qrcode');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>
          {activeTab === 'qrcode' ? '链接转二维码' : '批量提取URL'}
        </h2>
        <TabSelector onTabChange={handleTabChange} />
        
        <div className={styles.contentArea}>
          {activeTab === 'qrcode' ? (
            <div className={styles.qrcodeContent}>
              <QRCodeGenerator />
            </div>
          ) : (
            <div className={styles.extractContent}>
              <URLExtractor />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 