import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
export default defineUserConfig({
  title: "Hello 6",
  base: "/6/",
  theme: hopeTheme({
    repo: "6",
    docsDir: "docs",
    sidebar: {
      "/": [
        { text: "README", link: "/" },
        {
          text: "concept",
          children: [
            { text: "container.md", link: "/concept/container.md" },
            { text: "docker-compose.md", link: "/concept/docker-compose.md" },
            { text: "image.md", link: "/concept/image.md" },
            { text: "other.md", link: "/concept/other.md" },
            { text: "the_dockerfile.md", link: "/concept/the_dockerfile.md" },
          ],
        },
      ],
    },
  }),
});
