import React from "react"
import { Link, graphql } from "gatsby"
import LayoutTemplate from "../templates/layout"
import PostPreview from "../components/post/post-preview"
import "../styles/style.css"

const BlogPage = ({data}) => {
  const { edges: posts } = data.allMdx

  return (
    <LayoutTemplate>
      <main className="lg:w-2/3 lg:pl-8 xl:pl-12">
        <div className="py-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Blog
          </h2>
            {posts.map(({node}) => {
              const {title, date, category, tags} = node.frontmatter;

              return (
                <PostPreview key={node.id} post={{
                  title: title,
                  path: node.slug,
                  date: date,
                  category: category,
                  tags: tags,
                  excerpt: node.excerpt
                }} />
              )
            })}
          <Link to="/" className="inline-block mt-8 underline">
            &laquo; Go back to the site
          </Link>
        </div>
      </main>
    </LayoutTemplate>
  )
};

export default BlogPage;

export const query = graphql`
  query {
    allMdx (sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {published: {eq: true}}}){
      edges {
        node {
          id
          slug
          excerpt
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            path
            category
            tags
            featuredImage {
              name
              childImageSharp {
                fixed(width: 590) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
