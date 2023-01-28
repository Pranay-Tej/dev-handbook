---
id: documentation
title: Documentation Tools
sidebar_label: Overview
---

## Markdown

- [Markdown Syntax](https://daringfireball.net/projects/markdown/syntax)
- [Markdown Guide](https://markdown-guide.readthedocs.io/en/latest/index.html)

---

## Docusaurus

- initialize docusaurus project

```bash filename="terminal"
npx @docusaurus/init@latest init my-website classic
```

- delete blog/ folder
- enable "docs-only" mode
- [Guide](https://docusaurus.io/docs/docs-introduction#docs-only-mode)

```json filename="docusaurus.config"
docs: {
  routeBasePath: "/", // docs-only mode
}
```

- use the frontmatter slug: / on the document that should be the index page
- delete the existing homepage at ./src/pages/index.js
- add site details

```js filename="docusaurus.config.js"
module.exports={

  // add site details
  title: 'dev-handbook',
  tagline: 'Handbook for developers',
  url: 'https://dev-handbook.now.sh',
  baseUrl: '/',

  // remove footer
  // footer:{
    ..
  // }

  // github edit link
  editUrl:
    'https://github.com/Pranay-Tej/dev-handbook/edit/master/',
}
```

- Sidebar Configuration

```js filename="sidebar.js"
{
  type: "category",
  label: "Frontend",
  items: [
      {
          type: "doc",
          id: "frontend/frontend",
      },
      {
          type: "category",
          label: "React",
          items: ["frontend/react/react"],
      },
      {
          type: "category",
          label: "Angular",
          items: ["frontend/angular/angular"],
      },
  ],
  }
```

```md filename="Resulting Sidebar"
Frontend
|
+--Frontend
+--React
| +--React
+--Angular
| +--Angular
```

- Searchbar
  - [docusaurus-lunr-search](https://github.com/lelouch77/docusaurus-lunr-search)

```bash filename="project_folder"
npm i docusaurus-lunr-search  --save
npm run swizzle docusaurus-lunr-search SearchBar
```

```js filename="docusaurus.config.js"
module.exports = {
  // ...
  plugins: ["docusaurus-lunr-search"],
};
```

```bash filename="project_folder"
npm run build
npx http-server ./build
```

:::note
:::
**NOTE:** Docusaurus search information can only be generated from a production build. Local development is currently not supported.

---

### Syntax Highlighting for Languages

- [Source](https://v2.docusaurus.io/docs/markdown-features/#syntax-highlighting)

```js filename="docusaurus.config.js"
module.exports = {
  // ...
  themeConfig: {
    prism: {
      additionalLanguages: ["csharp"],
    },
    // ...
  },
};
```

### Syntax Highlight Theme

```js filename="docusaurus.config.js"
module.exports = {
  // ...
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/oceanicNext"),
    },
    // ...
  },
};
```

- [Theme Options](https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes)

### Syntax Highlighting

- Use word in single quote backtick for inline highlighting: `example`

```text
`word`
```

- Use triple backtick, specify language and title for code-syntax highlighting

````text
```js filename="example.js"
````

```js filename="example.js"
console.log("test");
```

- For normal text

````text
```text filename="example"
````

- For Note highlight

```text
:::note
:::
**NOTE:** Some important info
```

:::note
:::
**NOTE:** Some important info

---

### Deployment

#### Vercel

- Create account
- Connect Git repository from GitHub, GitLab or BitBucket

#### Netlify

```js filename="docusaurus.config.js"
module.exports = {
  url: "https://docusaurus-2.netlify.com", // url to your site with no trailing slash
  baseUrl: "/", // base directory of your site relative to your repo
};
```

- build command: `npm run build`
- build directory: `build`
