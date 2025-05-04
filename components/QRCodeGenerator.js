import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from '../styles/QRCodeGenerator.module.css';

const QRCodeGenerator = ({ initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');

  // 如果传入了initialUrl，直接生成二维码
  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      setGeneratedUrl(initialUrl);
    }
  }, [initialUrl]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleGenerate = () => {
    if (!url.trim()) {
      setError('请输入URL');
      return;
    }

    let processedUrl = url.trim();
    
    // 如果未包含协议，添加https://
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }

    if (!isValidUrl(processedUrl)) {
      setError('请输入有效的URL');
      return;
    }

    setGeneratedUrl(processedUrl);
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qrcode-canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = '二维码.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="请输入网址链接"
            className={styles.urlInput}
          />
          <button 
            onClick={handleGenerate} 
            className={styles.generateButton}
          >
            生成二维码
          </button>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>

      {generatedUrl && (
        <div className={styles.resultArea}>
          <div className={styles.qrcodeWrapper}>
            <div className={styles.qrheader}>
              <div className={styles.qrtitle}>NO.1</div>
              <div className={styles.qrsubtitle}>手机扫码，或者保存到相册识别</div>
            </div>
            <QRCodeCanvas
              id="qrcode-canvas"
              value={generatedUrl}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              includeMargin={true}
              className={styles.qrcode}
            />
            <div className={styles.urlDisplay}>
              <span className={styles.urlLabel}>主码</span>
              <div className={styles.urlText}>{generatedUrl}</div>
            </div>
          </div>
          <button onClick={handleDownload} className={styles.downloadButton}>
            下载二维码
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator; 