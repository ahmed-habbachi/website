module.exports = async ({ actions }, options) => {
  const basePath = options.basePath || "/"

  actions.createPage({
    path: basePath,
    component: require.resolve("../../templates/index.js"),
  })

  // actions.createPage({
  //   path: basePath,
  //   component: require.resolve("../../templates/post.js"),
  // })
}
