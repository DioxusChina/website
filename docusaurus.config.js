// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Dioxus 中文网",
  tagline: "帮助您快速构建可靠的用户界面程序。",
  url: "https://dioxus.cn",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "dioxus-china", // Usually your GitHub org/user name.
  projectName: "Dioxus", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/DioxusChina/website/tree/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/DioxusChina/website/tree/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Dioxus 中文网",
        logo: {
          alt: "Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "教程",
          },
          { to: "/blog", label: "博客", position: "left" },
          {
            href: "https://github.com/dioxus-cn/",
            label: "仓库",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "文档",
            items: [
              {
                label: "教程文档",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "社区",
            items: [
              {
                label: "QQ 群",
                href: "https://qm.qq.com/cgi-bin/qm/qr?k=WYctgoX1PhbnVAEXEZOnT2yHY3_D4K4g&jump_from=webapi",
              },
            ],
          },
          {
            title: "其他",
            items: [
              {
                label: "官方博客",
                to: "/blog",
              },
              {
                label: "开源仓库",
                href: "https://github.com/DioxusChina",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DioxusChina`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["rust"],
      },
    }),
};

module.exports = config;
