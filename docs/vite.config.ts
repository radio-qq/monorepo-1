import { fileURLToPath, URL } from "url";
import type { AliasOptions } from "vite";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

const pathResolve = (dir: string): string =>
  fileURLToPath(new URL(dir, import.meta.url));

const alias: AliasOptions = {
  "@components": pathResolve("../src/components"),
};

export default defineConfig(() => {
  return {
    resolve: {
      alias: alias,
    },
    plugins: [
      AutoImport({
        imports: ["vue"],
        eslintrc: {
          enabled: true,
        },
      }),
      vueJsx(),
    ],
  };
});
