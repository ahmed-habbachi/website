module.exports = ({
  basePath = "/",
  contentPath = "content/",
  showThemeLogo = true,
  showPostsInIndex = true,
  theme = "classic",
}) => {
  return {
    siteMetadata: {
      title: "John Doe",
      description: "Personal page of John Doe",
      locale: "en",
      showThemeLogo,
      showPostsInIndex,
    },
    plugins: [
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss")(require("./tailwind.config")(theme)),
            require("postcss-input-range"),
            require("autoprefixer"),
          ],
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-transformer-yaml`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: contentPath + '/posts/',
        },
      },
      {
        resolve: "gatsby-plugin-react-svg",
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-remark`,
      // {
      //   "resolve": `gatsby-transformer-remark`,
      //   "options": {
      //     "excerpt_separator": `<!-- more -->`,
      //     plugins: [
      //       {
      //         resolve: `gatsby-remark-images`,
      //         options: {
      //           // It's important to specify the maxWidth (in pixels) of
      //           // the content container as this plugin uses this as the
      //           // base for generating different widths of each image.
      //           maxWidth: 590,
      //         },
      //       },
      //     ],
      //   }
      // },
    ],
  }
}
