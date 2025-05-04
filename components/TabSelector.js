import React, { useState } from 'react';
import styles from '../styles/TabSelector.module.css';

const TabSelector = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('qrcode');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'qrcode' ? styles.active : ''}`}
          onClick={() => handleTabChange('qrcode')}
        >
          链接转二维码
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'extract' ? styles.active : ''}`}
          onClick={() => handleTabChange('extract')}
        >
          批量提取URL
        </button>
      </div>
    </div>
  );
};

export default TabSelector; 