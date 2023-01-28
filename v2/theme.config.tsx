import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Dev Handbook</span>,
  project: {
    link: "https://github.com/Pranay-Tej/dev-handbook",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s - DevHandbook",
    };
  },
  feedback: {
    content: null,
  },
  darkMode: true,
};

export default config;
