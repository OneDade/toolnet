const fs = require('fs');
const path = require('path');

// 配置
const domain = 'https://dadetool.xyz';
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD格式

// 网站页面配置
const pages = [
  {
    url: '/',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '1.0'
  }
  // 可以根据需要添加更多页面
];

// 生成XML
let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// 添加页面
pages.forEach(page => {
  xmlContent += `
  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
});

xmlContent += `
</urlset>`;

// 写入文件
fs.writeFileSync(outputPath, xmlContent, 'utf8');

console.log(`站点地图已生成至: ${outputPath}`); 