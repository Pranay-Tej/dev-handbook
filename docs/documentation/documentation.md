---
id: documentation
title: Documentation Tools
sidebar_label: Documentation Tools
---

## Markdown

-   [Markdown Syntax](https://daringfireball.net/projects/markdown/syntax)
-   [Markdown Guide](https://markdown-guide.readthedocs.io/en/latest/index.html)

## Docusaurus

-   initialize docusaurus project

    ```bash title="terminal"
    npx @docusaurus/init@next init dev-handbook classic

    ```

-   delete blog/ folder
-   enable "docs-only" mode

    ```json title="docusaurus.config"
    docs: {
      routeBasePath: "", // docs-only mode
    }
    ```

    ```js title="index.js"
    import { Redirect } from "@docusaurus/router";

    function Home() {
        return <Redirect to={useBaseUrl("/index")} />;
    }
    ```

-   add site details

    ```js title="docusaurus.config.js"
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

-   Sidebar Configuration
    ```js sidebar.js
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
    ```md title="Resulting Sidebar"
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
  
  ```bash title="project_folder"
  npm i docusaurus-lunr-search  --save
  npm run swizzle docusaurus-lunr-search SearchBar

  ```
  
  ```js title="docusaurus.config.js"
    module.exports = {
    // ...
    plugins: [
      'docusaurus-lunr-search'
    ]
  }
  ```
  
  ```bash title="project_folder"
  npm run build
  npx http-server ./build

  ```
:::note
Docusaurus search information can only be generated from a production build. Local development is currently not supported.
:::

### Deployment

#### Zeit

-   Create account
-   Connect Git repository

#### Netlify

  ```js title="docusaurus.config.js"
  module.exports = {
      url: "https://docusaurus-2.netlify.com", // url to your site with no trailing slash
      baseUrl: "/", // base directory of your site relative to your repo
  };
  ```

-   build command: `npm run build`
-   build directory: `build`
