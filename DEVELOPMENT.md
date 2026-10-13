# Doks 模板开发指南

基于 `npm create thulite@latest --template doks` 生成的原版模板，本文档说明如何在它基础上做二次开发。

---

## 1. 环境要求

| 工具 | 版本要求 | 说明 |
| --- | --- | --- |
| Node.js | >= 24.13.0 | 见 `package.json` 的 `engines` |
| Hugo Extended | 0.166.0+ | 必须是 **extended** 版（要编译 Sass） |
| Dart Sass | 1.104.1+ | Hugo 的 `dartsass` 转译器需要外部 `sass` 可执行文件 |

本机（Windows）的 Hugo 与 dart-sass 已装好并加入用户 PATH（新开的终端自动生效）：

- Hugo Extended 0.166.0：`C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_...`
- dart-sass 1.104.1：`C:\Users\Administrator\AppData\Local\dart-sass\dart-sass`（加入用户 PATH）

手动临时加 PATH（当前会话生效）：

```powershell
$env:PATH = "C:\Users\Administrator\AppData\Local\dart-sass\dart-sass;$env:PATH"
```

> dart-sass 1.104+ 的可执行文件是 `sass.bat`（不再是 `sass.exe`），目录结构为 `dart-sass\sass.bat + src\dart.exe`。

## 2. 常用命令

```bash
npm install          # 首次安装依赖
npm run dev          # 本地开发服务器（http://localhost:1313，热更新）
npm run build        # 生产构建 → public/（hugo --minify --gc）
npm run preview      # 用 vite preview 预览 public/ 构建产物
npm run format       # Prettier 格式化全部文件
npm run create -- <路径>   # hugo new，如 npm run create -- content/docs/foo.md
npm run new-post -- "文章标题" [slug]   # 新建博客文章（见 §5.3）
```

## 3. 目录结构

```
learning-dashboard/
├── content/            # 站点内容（Markdown）
│   ├── _index.md       #   首页（front matter 控制标题/lead/描述）
│   ├── docs/           #   文档章节（侧边栏导航的来源）
│   ├── blog/           #   博客文章
│   └── 404.md / privacy.md
├── layouts/            # 模板覆盖（同名文件会覆盖主题的布局）
│   ├── home.html       #   首页结构（main / sidebar-prefooter / sidebar-footer 三段）
│   └── single.html     #   单页模板覆盖
├── assets/             # 需要编译的资源（被 Hugo 管道处理）
│   ├── js/custom.js    #   自定义 JS → 打进 js/app.*.js bundle
│   └── scss/common/
│       ├── _custom.scss           # 自定义样式 → import 进 app.scss 末尾
│       └── _variables-custom.scss # 覆盖 SCSS 变量
├── static/             # 原样拷贝到构建输出（图片、favicon 等）
├── archetypes/         # hugo new 的 front matter 模板（已精简为 blog / docs 两份）
├── scripts/
│   └── new-post.mjs    # npm run new-post 的实现（新建博客文章）
├── i18n/               # 翻译文件（覆盖主题的英文文案；当前不存在，需要时新建）
├── config/             # 站点配置（见下节）
├── netlify.toml        # Netlify 部署参考（钉版本：Hugo 0.166.0 / Sass 1.104.1）
└── .github/workflows/deploy.yml  # GitHub Pages 自动部署
```

**核心机制**：主题代码在 `node_modules/@thulite/doks-core/`，本项目的 `layouts/`、`assets/` 通过 `config/_default/module.toml` 的 mounts **优先挂载**。所以定制只需要在本项目里创建同名文件覆盖，**永远不要直接改 node_modules**（升级会被覆盖）。

## 4. 配置说明

| 文件 | 作用 |
| --- | --- |
| `config/_default/hugo.toml` | 站点标题 `title`、开发环境 `baseurl`（`http://localhost/`）、语言开关 `disableLanguages` |
| `config/production/hugo.toml` | 生产环境覆盖（`baseurl = "/"`，线上地址由 CI 的 `--baseURL` 参数传入，不改文件） |
| `config/_default/params.toml` | `[doks]` 主题开关：`colorMode`（auto/light/dark）、`backgroundDots`、`sectionFooter`、`flexSearch`、`alert`、`docsRepo` 等 |
| `config/_default/languages.toml` | 多语言定义（en/de/nl；目前只启用 en） |
| `config/_default/menus/menus.en.toml` | 导航菜单：`[[main]]` 顶部导航、`[[footer]]` 页脚、`[[social]]` 社交图标、`[[sidebar_docs]]` 文档侧栏分组 |
| `config/_default/markup.toml` | Markdown 渲染选项（锚点、语法高亮等） |
| `config/postcss.config.js` | PostCSS + **PurgeCSS**（生产构建按 `hugo_stats.json` 裁剪 CSS，见 §7） |

## 5. 常见开发任务

### 5.1 改站点标题、首页文案

- 标题/描述：`config/_default/hugo.toml` 的 `title`、`params.toml` 的 `description`
- 首页文案：`content/_index.md` 的 front matter（`title` / `lead` / `description`）+ 正文 Markdown
- 首页结构（CTA 按钮、圆点装饰、特性网格）：`layouts/home.html`
- CTA 按钮文字：主题 i18n 的 `get_started`，在 `i18n/en.toml` 覆盖（新建即可）

### 5.2 新增文档章节

```bash
npm run create -- content/docs/guides/my-page.md
```

然后在文件 front matter 里填：

```yaml
---
title: "章节标题"
description: "列表页和 SEO 显示的描述"
lead: "一句话摘要"
weight: 30        # 控制侧边栏排序（数字越小越靠前）
slug: my-page     # 显式指定 URL 段，不填则用标题（中文会变成拼音）
---
```

- **URL 规则**（`hugo.toml` 的 `[permalinks] docs = "/docs/:sections[1:]/:slug/"`）：
  `content/docs/guides/my-page.md` → `/docs/guides/my-page/`
- 侧边栏顺序：`weight` 字段；分组由 `content/docs/<section>/_index.md` 决定
- 项目根目录已有 `archetypes/docs.md`（精简模板），`hugo new` 会自动生成 `title`/`slug`/`date`/`weight`，只需补 `description` 正文

### 5.3 写博客

一条命令建文章：

```bash
npm run new-post -- "SSE 断线重连实践" sse-reconnect   # 标题 + slug
npm run new-post -- "SSE reconnect"                    # 纯英文标题可省略 slug
```

- 生成 `content/blog/<slug>/index.md`，front matter 现成（title/slug/date/draft/tags）
- 中文标题没给 slug 时，slug 会退化成 `post-日期`，所以**建议总是带上英文 slug**，URL 固定为 `/blog/<slug>/`
- `draft: true` 只在本地可见，发布前改成 `false`
- 本地预览：`npm run dev` → `http://localhost:1313/blog/<slug>/`
- 不想用脚本也可以：`npm run create -- content/blog/<slug>/index.md`（走 `archetypes/blog.md`）

### 5.4 自定义样式

写到 `assets/scss/common/_custom.scss`（已挂到 `app.scss` 末尾），可直接使用 Bootstrap 变量：

```scss
.my-widget {
  color: $primary;
}
```

改 SCSS 变量（配色、字体等）用 `assets/scss/common/_variables-custom.scss`（在 Bootstrap 变量加载后生效）。

### 5.5 自定义 JS

写到 `assets/js/custom.js`，构建时会打进 `js/app.*.js` bundle，无需改其他文件：

```js
document.addEventListener('DOMContentLoaded', () => {
  // ...
});
```

### 5.6 改导航 / 页脚 / 社交链接

编辑 `config/_default/menus/menus.en.toml`：

```toml
[[main]]
  name = "知识文档"
  url = "/docs/guides/ai-agent/"
  weight = 10

[[social]]
  name = "GitHub"
  pre = '<svg ...>...</svg>'
  url = "https://github.com/your-name"
  weight = 30
```

### 5.7 主题外观开关

`config/_default/params.toml` 的 `[doks]` 段，常用：

```toml
colorMode = "auto"        # auto / light / dark
colorModeToggler = true   # 是否显示明暗切换按钮
backgroundDots = true     # 首页圆点装饰
sectionFooter = false     # 首页底部 CTA 大条
flexSearch = true         # 全文搜索
alert = false             # 顶部通告条
docsRepo = "https://github.com/LiuRoi/learning-dashboard"  # 源码链接
```

## 6. 构建与部署

### 日常流程

```bash
# 1. 本地开发
npm run dev

# 2. 提交（约定式提交）
git add <文件>
git commit -m "feat: 添加 xxx 功能"

# 3. 推送即自动部署
git push origin main
```

- 推到 `main` → GitHub Actions（`.github/workflows/deploy.yml`）自动：`npm ci` → 装 dart-sass 1.104.1 → Hugo 0.166.0 构建 → 发布到 GitHub Pages
- 构建命令里的 `--baseURL "https://liuroi.github.io/learning-dashboard/"` 是在 CI 传入的，**不要**改 `config/production/hugo.toml`
- 前提：仓库 Settings → Pages → Source = **GitHub Actions**（已配置好）
- 约定式提交格式：`feat:` / `fix:` / `docs:` / `style:` / `refactor:` / `chore:` / `ci:` / `perf:`

### 本地验证生产构建

```powershell
hugo --gc --minify --baseURL "http://localhost:4173/"
npm run preview   # 打开 http://localhost:4173
```

## 7. 生产构建注意事项（PurgeCSS）

`config/postcss.config.js` 在**生产环境**（`hugo` 默认即 production）会按 `hugo_stats.json`（页面实际用到的 class/标签/id）裁剪 CSS：

- **只出现在 JS 里、不出现在任何 HTML 中的 class 会被裁掉**。解决办法二选一：
  1. 把 class 名加进 `postcss.config.js` 的 `safelist`
  2. 或确保页面 HTML 里存在该 class（哪怕是注释之外的真实元素）
- 想看未裁剪的完整样式：用 `HUGO_ENVIRONMENT=development hugo` 构建（dev 模式不启用 PurgeCSS）
- `hugo_stats.json` 是 Hugo 构建时自动写入的，已纳入版本管理，CI 上首次构建即可正常裁剪

## 8. 升级与参考

- **升级依赖**：`npm outdated` → `npm update`；主题核心是 `@thulite/doks-core`
- **官方模板**：https://github.com/thuliteio/doks
- **官方文档**：https://getdoks.org
- **Hugo 文档**：https://gohugo.io/documentation
- 覆盖文件与主题同名即生效（§3 的机制），升级主题后本项目的覆盖依然保留
