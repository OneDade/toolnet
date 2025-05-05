import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          {/* Google AdSense */}
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7349183125613006"
            crossOrigin="anonymous"
          />
          
          {/* 网站图标 */}
          <link rel="icon" href="/favicon.ico" />
          
          {/* 额外的meta标签 */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#4361ee" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="达德工具站 - 在线二维码生成与URL提取工具" />
          <meta property="og:description" content="免费在线工具，一键生成二维码，批量提取URL，提高工作效率" />
          <meta property="og:site_name" content="达德工具站" />
          <meta property="og:url" content="https://dadetool.xyz" />
          
          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="达德工具站 - 在线二维码生成与URL提取工具" />
          <meta name="twitter:description" content="免费在线工具，一键生成二维码，批量提取URL，提高工作效率" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 