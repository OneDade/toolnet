import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from '../styles/UnifiedTool.module.css';

const UnifiedTool = () => {
  const [inputText, setInputText] = useState('');
  const [activeFunction, setActiveFunction] = useState(null); // 'qrcode' 或 'extract'
  const [extractedUrls, setExtractedUrls] = useState([]);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [error, setError] = useState('');
  const [showBatchQrCodes, setShowBatchQrCodes] = useState(false);
  
  // 推荐功能
  const [recommendedFunction, setRecommendedFunction] = useState(null);
  
  // 监听输入变化，提供推荐功能
  useEffect(() => {
    if (!inputText.trim()) {
      setRecommendedFunction(null);
      return;
    }
    
    // 如果输入内容包含多行或多个URL的特征，推荐URL提取功能
    if (inputText.includes('\n') || inputText.split(' ').length > 3) {
      setRecommendedFunction('extract');
    } else {
      // 否则推荐二维码生成功能
      setRecommendedFunction('qrcode');
    }
  }, [inputText]);
  
  // 重置状态
  const resetState = () => {
    setActiveFunction(null);
    setExtractedUrls([]);
    setGeneratedUrl('');
    setSelectedUrls([]);
    setError('');
    setShowBatchQrCodes(false);
  };
  
  // URL有效性检查
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  // 处理二维码生成
  const handleGenerateQRCode = () => {
    resetState();
    setActiveFunction('qrcode');
    
    if (!inputText.trim()) {
      setError('请输入URL');
      return;
    }
    
    let processedUrl = inputText.trim();
    
    // 如果未包含协议，添加https://
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }
    
    if (!isValidUrl(processedUrl)) {
      setError('请输入有效的URL');
      return;
    }
    
    setGeneratedUrl(processedUrl);
    setError('');
  };
  
  // 处理URL提取
  const handleExtractUrls = () => {
    resetState();
    setActiveFunction('extract');
    
    if (!inputText.trim()) {
      setError('请输入包含URL的文本');
      return;
    }
    
    // URL正则匹配，支持http/https/ftp，及无协议的网址
    const urlRegex = /(https?:\/\/|ftp:\/\/|www\.)[^\s/$.?#].[^\s]*|[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?(:\d+)?(\/\S*)?/gi;
    let matches = inputText.match(urlRegex) || [];
    
    // 处理没有协议前缀的网址
    matches = matches.map(url => {
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('ftp://')) {
        return 'https://' + url;
      }
      return url;
    });
    
    // 去除重复
    matches = [...new Set(matches)];
    
    if (matches.length === 0) {
      setError('未找到有效的URL');
      return;
    }
    
    setExtractedUrls(matches);
    setError('');
  };
  
  // 处理单个URL生成二维码
  const handleSingleUrlQRCode = (url) => {
    setActiveFunction('qrcode');
    setGeneratedUrl(url);
    setExtractedUrls([]);
  };
  
  // 处理URL选择
  const handleUrlSelection = (url) => {
    if (selectedUrls.includes(url)) {
      setSelectedUrls(selectedUrls.filter(item => item !== url));
    } else {
      setSelectedUrls([...selectedUrls, url]);
    }
  };
  
  // 处理全选/反选
  const handleSelectAll = () => {
    if (selectedUrls.length === extractedUrls.length) {
      setSelectedUrls([]);
    } else {
      setSelectedUrls([...extractedUrls]);
    }
  };
  
  // 处理批量生成二维码
  const handleBatchGenerateQRCodes = () => {
    if (selectedUrls.length === 0) return;
    setShowBatchQrCodes(true);
  };
  
  // 处理复制URL
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        // 可以添加复制成功的提示
      })
      .catch(err => {
        console.error('复制失败: ', err);
      });
  };
  
  // 处理导出URL列表
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
  
  // 处理二维码下载
  const handleDownloadQRCode = () => {
    const canvas = document.getElementById('qrcode-canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = '二维码.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };
  
  // 处理批量二维码下载
  const handleBatchDownloadQRCodes = () => {
    if (selectedUrls.length === 0) return;
    
    // 创建一个zip文件，需要动态导入jszip库
    import('jszip').then(JSZip => {
      const zip = new JSZip.default();
      
      // 为每个URL创建一个Promise来获取二维码图片数据
      const promises = selectedUrls.map((url, index) => {
        return new Promise((resolve) => {
          // 创建临时canvas来生成二维码
          const canvas = document.createElement('canvas');
          
          // 正确使用QRCodeCanvas
          const qrCodeCanvas = <QRCodeCanvas
            value={url}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={true}
          />;
          
          // 将React元素渲染到DOM中以获取canvas
          const tempDiv = document.createElement('div');
          document.body.appendChild(tempDiv);
          
          // 使用ReactDOM渲染
          import('react-dom').then(ReactDOM => {
            ReactDOM.render(qrCodeCanvas, tempDiv, () => {
              // 获取渲染后的canvas
              const renderedCanvas = tempDiv.querySelector('canvas');
              
              if (renderedCanvas) {
                // 将canvas转换为blob
                renderedCanvas.toBlob((blob) => {
                  // 完成后移除临时DOM元素
                  document.body.removeChild(tempDiv);
                  
                  if (blob) {
                    // 为URL生成一个安全的文件名
                    const filename = `二维码_${index + 1}.png`;
                    resolve({ blob, filename });
                  } else {
                    resolve(null);
                  }
                });
              } else {
                document.body.removeChild(tempDiv);
                resolve(null);
              }
            });
          });
        });
      });
      
      // 等待所有二维码生成完成
      Promise.all(promises).then(results => {
        // 过滤掉生成失败的项
        const validResults = results.filter(result => result !== null);
        
        if (validResults.length === 0) {
          console.error('生成二维码失败');
          return;
        }
        
        // 将所有二维码添加到zip中
        validResults.forEach(({ blob, filename }) => {
          zip.file(filename, blob);
        });
        
        // 生成zip文件并下载
        zip.generateAsync({ type: 'blob' }).then(content => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = '批量二维码.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        });
      });
    }).catch(error => {
      console.error('加载JSZip库失败:', error);
      alert('下载功能加载失败，请刷新页面重试');
    });
  };
  
  // 返回列表
  const handleBackToList = () => {
    setShowBatchQrCodes(false);
  };
  
  // 返回输入
  const handleBackToInput = () => {
    resetState();
  };
  
  // 渲染输入区域
  const renderInputArea = () => (
    <div className={styles.inputArea}>
      <textarea
        className={styles.textInput}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="输入网址或包含多个URL的文本..."
        rows={5}
      />
      
      <div className={styles.actionButtons}>
        <button
          onClick={handleGenerateQRCode}
          className={`${styles.actionButton} ${recommendedFunction === 'qrcode' ? styles.recommended : ''}`}
        >
          生成二维码
          {recommendedFunction === 'qrcode' && <span className={styles.recommendBadge}>推荐</span>}
        </button>
        
        <button
          onClick={handleExtractUrls}
          className={`${styles.actionButton} ${recommendedFunction === 'extract' ? styles.recommended : ''}`}
        >
          提取URL并生成二维码
          {recommendedFunction === 'extract' && <span className={styles.recommendBadge}>推荐</span>}
        </button>
      </div>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
  
  // 渲染二维码结果
  const renderQRCodeResult = () => (
    <div className={styles.resultArea}>
      <button onClick={handleBackToInput} className={styles.backButton}>
        返回
      </button>
      
      <div className={styles.qrcodeWrapper}>
        <div className={styles.qrheader}>
          <div className={styles.qrtitle}>二维码</div>
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
          <span className={styles.urlLabel}>网址</span>
          <div className={styles.urlText}>{generatedUrl}</div>
        </div>
      </div>
      
      <button onClick={handleDownloadQRCode} className={styles.downloadButton}>
        下载二维码
      </button>
    </div>
  );
  
  // 渲染URL提取结果
  const renderExtractResult = () => (
    <div className={styles.resultArea}>
      <button onClick={handleBackToInput} className={styles.backButton}>
        返回
      </button>
      
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
                onClick={() => handleSingleUrlQRCode(url)}
                className={styles.actionButton}
              >
                生成二维码
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  // 渲染批量二维码
  const renderBatchQRCodes = () => (
    <div className={styles.batchQrcodeView}>
      <button 
        onClick={handleBackToList}
        className={styles.backButton}
      >
        返回列表
      </button>
      
      <div className={styles.batchQrcodesContainer}>
        <h3 className={styles.batchTitle}>批量二维码 ({selectedUrls.length}个)</h3>
        
        <button 
          onClick={handleBatchDownloadQRCodes} 
          className={styles.batchDownloadButton}
        >
          批量下载二维码
        </button>
        
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
  );
  
  // 根据当前状态渲染不同内容
  const renderContent = () => {
    if (showBatchQrCodes) {
      return renderBatchQRCodes();
    }
    
    if (activeFunction === 'qrcode' && generatedUrl) {
      return renderQRCodeResult();
    }
    
    if (activeFunction === 'extract' && extractedUrls.length > 0) {
      return renderExtractResult();
    }
    
    return renderInputArea();
  };
  
  return (
    <div className={styles.container}>
      {renderContent()}
    </div>
  );
};

export default UnifiedTool; 