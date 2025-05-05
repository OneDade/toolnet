import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import UnifiedTool from '../components/UnifiedTool';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import styles from '../styles/Home.module.css';

export default function Home() {
  // 定义结构化数据
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "达德工具站",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    },
    "description": "在线二维码生成与URL提取工具，提供批量操作和下载功能",
    "browserRequirements": "支持HTML5的浏览器",
    "featureList": "二维码生成、URL提取、批量二维码生成、二维码下载",
    "softwareVersion": "1.0",
    "url": "https://dadetool.xyz"
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>达德工具站 - 在线二维码生成与URL提取工具</title>
        <meta name="description" content="免费在线工具，一键生成二维码，批量提取URL，提高工作效率" />
        <meta name="keywords" content="二维码生成,URL提取,批量二维码,在线工具" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      
      <header>
        <Navbar />
      </header>
      
      <AdBanner 
        linkUrl="http://dade2017.ugfkw.com/" 
        altText="瓶盖特惠，限时抢购！" 
      />
      
      <main className={styles.main}>
        <h1 className={styles.sectionTitle}>达德在线工具</h1>
        <section className={styles.contentArea}>
          <UnifiedTool />
        </section>
      </main>
      <Footer />
    </div>
  );
} 