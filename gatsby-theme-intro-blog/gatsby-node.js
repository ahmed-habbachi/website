exports.onPreBootstrap = require("./src/gatsby/node/onPreBootstrap")
exports.sourceNodes = require("./src/gatsby/node/sourceNodes")
exports.createPages = require("./src/gatsby/node/createPages")

// const path = require("path")

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   const postTemplate = path.resolve("src/templates/post.js")

//   return graphql(`
//     {
//       allMarkdownRemark(
//         limit: 10
//         filter: { frontmatter: { published: { eq: true } } }
//         sort: { fields: [frontmatter___date], order: DESC }
//       ) {
//         edges {
//           node {
//             id
//             excerpt
//             frontmatter {
//               title
//               path
//               date
//               category
//               tags
//               featuredImage {
//                 publicURL
//                 childImageSharp {
//                   fluid {
//                     src
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `).then(res => {
//     if (res.errors) {
//       return Promise.reject(res.errors)
//     }

//     res.data.allMarkdownRemark.edges.forEach(({ node }) => {
//       createPage({
//         path: node.frontmatter.path,
//         component: postTemplate,
//       })
//     })
//   })
// }
