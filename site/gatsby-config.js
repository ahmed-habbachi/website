module.exports = {
  siteMetadata: {
    description: "Personal page of Ahmed HABBACHI",
    locale: "en",
    title: "Ahmed HABBACHI",
  },
  plugins: [
    {
      resolve: "@ahmed-habbachi/gatsby-theme-intro-blog",
      options: {
        basePath: "/",
        contentPath: "content/",
        showThemeLogo: true,
        showPostsInIndex: true,
        theme: "gh-inspired",
      },
    },
  ],
}
