module.exports = async ({ graphql, actions, reporter }, options) => {
  const basePath = options.basePath || "/"

  actions.createPage({
    path: basePath,
    component: require.resolve("../../templates/index.js"),
  });

  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: require.resolve(`../../templates/posts-layout.js`),
      context: { id: node.id },
    });
  });
}
