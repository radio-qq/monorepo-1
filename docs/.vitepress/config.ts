import { defineConfig } from "vitepress";
import { mdPlugin } from "./plugins/mdPlugin";

export default defineConfig({
  title: "Schema Driven Development",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    sidebar: [
      {
        text: "Examples??",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Overview", link: "/overview" },
        ],
      },
      {
        text: "schema组件",
        items: [
          { text: "表单", link: "/advance-components/basic-form" },
          { text: "表格", link: "/advance-components/basic-table" },
        ],
      },
      {
        text: "基本",
        items: [
          { text: "数据收集", link: "/basic-components/data-collect" },
          { text: "数据展示", link: "/basic-components/data-display" },
          { text: "其它", link: "/basic-components/other" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    lineNumbers: true,
    config: (md) => mdPlugin(md),
  },
});
