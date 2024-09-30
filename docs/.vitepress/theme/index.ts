import DefaultTheme from "vitepress/theme";
import type { App } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// @ts-ignore
// 导入plus-pro-components样式，alias 处理过，正常导入是plus-pro-components/index.min.css
import "element-plus/theme-chalk/dark/css-vars.css";

import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js";

import DocsCodeDemo from "./components/DocsCodeDemo.vue";

import directive from "./directives/index";
import "./styles/index.scss";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(ElementPlus, {
      locale: { ...zhCn },
    });
    app.component("highlightjs", hljsVuePlugin.component);

    app.component("DocsCodeDemo", DocsCodeDemo);

    directive(app);
  },
};
