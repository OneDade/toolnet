import React from 'react';
import styles from '../styles/Home.module.css';

function Error({ statusCode }) {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <h1>
          {statusCode
            ? `错误 ${statusCode}`
            : '发生错误'}
        </h1>
        <p>抱歉，页面加载出现问题。</p>
        <a href="/" className={styles.backLink}>
          返回首页
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 