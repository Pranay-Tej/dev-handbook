module.exports = {
  title: "dev-handbook",
  tagline: "Handbook for developers",
  url: "https://dev-handbook.now.sh",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/code-slash.ico",
  organizationName: "Pranay-Tej", // Usually your GitHub org/user name.
  projectName: "dev-handbook", // Usually your repo name.
  themeConfig: {
    colorMode: {
      // "light" | "dark"
      defaultMode: "dark",
    },
    navbar: {
      title: "dev-handbook",
      items: [
        {
          href: "https://github.com/Pranay-Tej/dev-handbook",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      additionalLanguages: ["csharp"],
      theme: require("prism-react-renderer/themes/oceanicNext"),
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/", // docs-only mode
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/Pranay-Tej/dev-handbook/edit/master/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: ["docusaurus-lunr-search"],
};
