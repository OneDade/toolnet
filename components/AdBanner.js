import React from 'react';
import styles from '../styles/AdBanner.module.css';

const AdBanner = ({ imageUrl, linkUrl, altText }) => {
  return (
    <div className={styles.adBannerContainer}>
      <div className={styles.adContent}>
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.adLink}
        >
          <div className={styles.adLabel}>广告</div>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={altText || '推广广告'} 
              className={styles.adImage} 
            />
          ) : (
            <div className={styles.placeholderAd}>
              <div className={styles.placeholderText}>
                {altText || '瓶盖特惠，限时抢购！'}
              </div>
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

export default AdBanner; 