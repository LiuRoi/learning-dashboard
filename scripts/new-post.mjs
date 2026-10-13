import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [title, slugArg] = process.argv.slice(2);

if (!title) {
  console.error('用法: npm run new-post -- "文章标题" [slug]');
  console.error('示例: npm run new-post -- "SSE 断线重连实践" sse-reconnect');
  process.exit(1);
}

const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}+08:00`;
const dateCompact = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

// slug 只允许 ASCII：标题是中文且未指定 slug 时，回退为 post-日期
const derived = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
const slug = slugArg || derived || `post-${dateCompact}`;

const dir = join(process.cwd(), 'content', 'blog', slug);
const file = join(dir, 'index.md');

if (existsSync(file)) {
  console.error(`已存在: ${file}`);
  process.exit(1);
}

const safeTitle = title.replace(/"/g, '\\"');
const content = `---
title: "${safeTitle}"
slug: "${slug}"
date: ${date}
description: ""
draft: true
tags: []
categories: []
params:
  seo:
    title: ""
    description: ""
    canonical: ""
    robots: ""
---

在这里写正文……
`;

mkdirSync(dir, { recursive: true });
writeFileSync(file, content, 'utf8');

console.log(`已创建: content/blog/${slug}/index.md`);
console.log(`访问地址（本地预览）: http://localhost:1313/blog/${slug}/`);
console.log('draft: true 只在本地可见；发布时改成 false 再 push。');
