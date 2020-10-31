module.exports = {
  siteMetadata: {
    description: "Personal page of Ahmed HABBACHI",
    locale: "en",
    title: "Ahmed HABBACHI",
  },
  plugins: [
    {
      resolve: "@wkocjan/gatsby-theme-intro",
      options: {
        basePath: "/",
        contentPath: "content/",
        showThemeLogo: true,
        theme: "gh-inspired",
      },
    },
  ],
}
