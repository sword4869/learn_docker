import { defineConfig } from "vuepress/config";

export default defineConfig({
  title: "Hello VuePress",
  base: "/learn_docker/",
  themeConfig: {
    docsRepo: "sword4869/learn_docker",
    docsBranch: "main",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Help us improve this page!",

    sidebar: {
      "/": [
        {
          title: "concept",
          children: [
            ["/concept/container.md", "container.md"],
            ["/concept/docker-compose.md", "docker-compose.md"],
            ["/concept/image.md", "image.md"],
            ["/concept/other.md", "other.md"],
            ["/concept/the_dockerfile.md", "the_dockerfile.md"],
          ],
        },
      ],
    },
  },
});
