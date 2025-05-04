import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from '../styles/URLExtractor.module.css';
import QRCodeGenerator from './QRCodeGenerator';

const URLExtractor = () => {
  const [text, setText] = useState('');
  const [extractedUrls, setExtractedUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [filterDuplicates, setFilterDuplicates] = useState(true);
  const [urlType, setUrlType] = useState('all');
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [showBatchQrCodes, setShowBatchQrCodes] = useState(false);
  
  // 正则表达式匹配URL
  const extractUrls = () => {
    if (!text.trim()) return;
    
    // URL正则匹配，支持http/https/ftp，及无协议的网址
    const urlRegex = /(https?:\/\/|ftp:\/\/|www\.)[^\s/$.?#].[^\s]*|[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?(:\d+)?(\/\S*)?/gi;
    let matches = text.match(urlRegex) || [];
    
    // 处理没有协议前缀的网址
    matches = matches.map(url => {
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('ftp://')) {
        return 'https://' + url;
      }
      return url;
    });
    
    // 根据类型筛选
    if (urlType !== 'all') {
      matches = matches.filter(url => url.startsWith(urlType));
    }
    
    // 去除重复
    if (filterDuplicates) {
      matches = [...new Set(matches)];
    }
    
    setExtractedUrls(matches);
    setSelectedUrls([]);
  };
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleTypeChange = (e) => {
    setUrlType(e.target.value);
  };
  
  const handleDuplicatesChange = (e) => {
    setFilterDuplicates(e.target.checked);
  };
  
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        // 可以添加复制成功的提示
      })
      .catch(err => {
        console.error('复制失败: ', err);
      });
  };
  
  const handleGenerateQRCode = (url) => {
    setSelectedUrl(url);
    setShowQrCode(true);
  };
  
  const handleBackToList = () => {
    setShowQrCode(false);
    setShowBatchQrCodes(false);
  };

  const handleUrlSelection = (url) => {
    if (selectedUrls.includes(url)) {
      setSelectedUrls(selectedUrls.filter(item => item !== url));
    } else {
      setSelectedUrls([...selectedUrls, url]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUrls.length === extractedUrls.length) {
      setSelectedUrls([]);
    } else {
      setSelectedUrls([...extractedUrls]);
    }
  };

  const handleBatchGenerateQRCodes = () => {
    if (selectedUrls.length === 0) return;
    setShowBatchQrCodes(true);
  };

  const handleExportUrls = () => {
    if (selectedUrls.length === 0) return;
    
    // 创建csv内容
    const csvContent = "data:text/csv;charset=utf-8," 
      + selectedUrls.join('\n');
    
    // 创建下载链接并触发点击
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "提取的URL列表.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className={styles.container}>
      {!showQrCode && !showBatchQrCodes ? (
        <>
          <div className={styles.inputArea}>
            <textarea
              className={styles.textInput}
              value={text}
              onChange={handleTextChange}
              placeholder="请在此粘贴包含URL的文本"
              rows={8}
            />
            <div className={styles.options}>
              <div className={styles.option}>
                <input
                  type="checkbox"
                  id="filterDuplicates"
                  checked={filterDuplicates}
                  onChange={handleDuplicatesChange}
                />
                <label htmlFor="filterDuplicates">过滤重复URL</label>
              </div>
              <div className={styles.option}>
                <label htmlFor="urlType">URL类型:</label>
                <select
                  id="urlType"
                  value={urlType}
                  onChange={handleTypeChange}
                  className={styles.select}
                >
                  <option value="all">所有类型</option>
                  <option value="https://">仅HTTPS</option>
                  <option value="http://">仅HTTP</option>
                </select>
              </div>
            </div>
            <button 
              className={styles.extractButton}
              onClick={extractUrls}
            >
              提取URL
            </button>
          </div>
          
          {extractedUrls.length > 0 && (
            <div className={styles.resultArea}>
              <div className={styles.resultHeader}>
                <h3>提取结果 ({extractedUrls.length}个URL)</h3>
                {extractedUrls.length > 0 && (
                  <div className={styles.batchActions}>
                    <button 
                      className={styles.batchActionButton}
                      onClick={handleSelectAll}
                    >
                      {selectedUrls.length === extractedUrls.length ? '取消全选' : '全选'}
                    </button>
                    <button 
                      className={`${styles.batchActionButton} ${selectedUrls.length === 0 ? styles.disabled : ''}`}
                      onClick={handleBatchGenerateQRCodes}
                      disabled={selectedUrls.length === 0}
                    >
                      批量生成二维码
                    </button>
                    <button 
                      className={`${styles.batchActionButton} ${selectedUrls.length === 0 ? styles.disabled : ''}`}
                      onClick={handleExportUrls}
                      disabled={selectedUrls.length === 0}
                    >
                      导出列表
                    </button>
                  </div>
                )}
              </div>
              <ul className={styles.urlList}>
                {extractedUrls.map((url, index) => (
                  <li key={index} className={styles.urlItem}>
                    <div className={styles.urlSelection}>
                      <input 
                        type="checkbox" 
                        checked={selectedUrls.includes(url)}
                        onChange={() => handleUrlSelection(url)}
                        id={`url-${index}`}
                        className={styles.checkbox}
                      />
                      <span className={styles.url}>{url}</span>
                    </div>
                    <div className={styles.actions}>
                      <button 
                        onClick={() => handleCopyUrl(url)}
                        className={styles.actionButton}
                      >
                        复制
                      </button>
                      <button 
                        onClick={() => handleGenerateQRCode(url)}
                        className={styles.actionButton}
                      >
                        生成二维码
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : showBatchQrCodes ? (
        <div className={styles.batchQrcodeView}>
          <button 
            onClick={handleBackToList}
            className={styles.backButton}
          >
            返回列表
          </button>
          <div className={styles.batchQrcodesContainer}>
            <h3 className={styles.batchTitle}>批量二维码 ({selectedUrls.length}个)</h3>
            <div className={styles.qrcodeGrid}>
              {selectedUrls.map((url, index) => (
                <div key={index} className={styles.qrcodeGridItem}>
                  <div className={styles.miniQrcodeWrapper}>
                    <QRCodeCanvas
                      value={url}
                      size={150}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"H"}
                      includeMargin={true}
                      className={styles.miniQrcode}
                    />
                    <div className={styles.miniUrlDisplay}>
                      <div className={styles.miniUrlText}>{url}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.qrcodeView}>
          <button 
            onClick={handleBackToList}
            className={styles.backButton}
          >
            返回列表
          </button>
          <div className={styles.qrcodeContainer}>
            <QRCodeGenerator initialUrl={selectedUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default URLExtractor; 