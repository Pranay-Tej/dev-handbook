module.exports = {
  title: 'dev-handbook',
  tagline: 'Handbook for developers',
  url: 'https://dev-handbook.now.sh',
  baseUrl: '/',
  favicon: 'img/code-slash.ico',
  organizationName: 'Pranay-Tej', // Usually your GitHub org/user name.
  projectName: 'dev-handbook', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'dev-handbook',
      links: [
        {
          href: 'https://github.com/Pranay-Tej/dev-handbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      additionalLanguages: ['csharp'],
      theme: require('prism-react-renderer/themes/oceanicNext'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: "", // docs-only mode
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Pranay-Tej/dev-handbook/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    'docusaurus-lunr-search'
  ]
};
