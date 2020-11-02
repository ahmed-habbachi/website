import React from "react"
import { Link, graphql } from "gatsby"
import LayoutTemplate from "../templates/layout"
import PostPreview from "../components/Post/post-preview"
import "../styles/style.css"

const BlogPage = ({data}) => (
    <LayoutTemplate>
      <main className="lg:w-2/3 lg:pl-8 xl:pl-12">
        <div className="py-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Blogs
          </h2>
            {data.allMarkdownRemark.edges.map((edge, index) => (
                <PostPreview key={index} post={{
                  title: edge.node.frontmatter.title,
                  path: edge.node.frontmatter.path,
                  date: edge.node.frontmatter.date,
                  excerpt: edge.node.excerpt
                }} />
            ))}
          <Link to="/" className="inline-block mt-8 underline">
            &laquo; Go back to the site
          </Link>
        </div>
      </main>
    </LayoutTemplate>
);

export default BlogPage;

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            path
          }
          excerpt
        }
      }
    }
  }
`;
