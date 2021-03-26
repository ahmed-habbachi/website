module.exports = ({
  basePath = "/",
  contentPath = "content/",
  showThemeLogo = true,
  showPostsInIndex = true,
  showBlogButton = true,
  showDownloadCVButton = true,
  theme = "classic",
}) => {
  return {
    siteMetadata: {
      title: "John Doe",
      description: "Personal page of John Doe",
      locale: "en",
      showThemeLogo,
      showPostsInIndex,
      showBlogButton,
      showDownloadCVButton
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
          path: `static/images/favicon`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${contentPath}/images`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `pages`,
          path: `${__dirname}/src/pages/`,
        },
      },
      {
        resolve: "gatsby-plugin-react-svg",
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      // `gatsby-transformer-remark`,
      // {
      //   resolve: `gatsby-transformer-remark`,
      //   options: {
      //     excerpt_separator: `<!-- more -->`,
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
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `${contentPath}/posts`,
        },
      },
      // {
      //   resolve: `gatsby-plugin-page-creator`,
      //   options: {
      //     path: `${contentPath}/posts`,
      //   },
      // },
      {
        resolve : `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          // defaultLayouts: {
          //   // posts: require.resolve("./src/templates/posts-layout.js"),
          //   default: require.resolve("./src/templates/posts-layout.js"),
          // },
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
                linkImagesToOriginal: false,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      }
    ],
  }
}
