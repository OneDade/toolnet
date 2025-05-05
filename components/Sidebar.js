import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 工具列表数据
  const tools = [
    {
      id: 'qrcode',
      name: '二维码生成',
      description: '快速生成二维码图片',
      icon: '🔲',
      active: true
    },
    {
      id: 'url-extract',
      name: 'URL提取',
      description: '从文本中批量提取URL',
      icon: '🔗',
      active: true
    },
    {
      id: 'batch-qrcode',
      name: '批量二维码',
      description: '生成多个二维码并打包下载',
      icon: '📦',
      active: true
    },
    {
      id: 'text-tools',
      name: '文本工具',
      description: '文本格式化、编码转换等',
      icon: '📝',
      active: false,
      comingSoon: true
    },
    {
      id: 'image-tools',
      name: '图片工具',
      description: '图片格式转换、压缩等',
      icon: '🖼️',
      active: false,
      comingSoon: true
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button 
        className={styles.menuToggle} 
        onClick={toggleMenu}
        aria-label="工具菜单"
      >
        <span className={styles.menuIcon}>
          {isMenuOpen ? '✕' : '☰'}
        </span>
        <span className={styles.menuText}>工具列表</span>
      </button>
      
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>工具列表</h2>
          <button 
            className={styles.closeMenu}
            onClick={toggleMenu}
            aria-label="关闭菜单"
          >
            ✕
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <ul className={styles.toolList}>
            {tools.map((tool) => (
              <li key={tool.id} className={`${styles.toolItem} ${tool.active ? '' : styles.disabled}`}>
                <Link href={tool.active ? `/#${tool.id}` : '#'}>
                  <a className={styles.toolLink} onClick={isMenuOpen ? toggleMenu : undefined}>
                    <span className={styles.toolIcon}>{tool.icon}</span>
                    <div className={styles.toolInfo}>
                      <span className={styles.toolName}>
                        {tool.name}
                        {tool.comingSoon && <span className={styles.comingSoon}>即将推出</span>}
                      </span>
                      <span className={styles.toolDescription}>{tool.description}</span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <p className={styles.sidebarFooterText}>更多工具持续更新中...</p>
        </div>
      </aside>
      
      {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default Sidebar; 