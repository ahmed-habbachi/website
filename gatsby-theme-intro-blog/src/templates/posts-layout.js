import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from "gatsby"
import LayoutTemplate from "../templates/layout"
import PostDetails from "../components/post/post-details"
import "../styles/style.css"

const PostsLayout = ({data}) => {
  const { frontmatter, body } = data.mdx

  return (
    <LayoutTemplate>
      <main className="w-11/12 sm:w-11/12 md:w-11/12 lg:w-2/3 lg:pl-8 xl:pl-12">
      <Img key={frontmatter.featuredImage.name} fixed={frontmatter.featuredImage.childImageSharp.fixed} alt={frontmatter.featuredImage.name} />
        <h1 className="text-2xl font-bold sm:text-4xl" >{frontmatter.title}</h1>
        <PostDetails author={"Ahmed HABBACHI"} date={frontmatter.date} className="text-base font-normal"/>
        <article className="py-12 prose prose-sm sm:prose lg:prose-lg xl:prose-xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <MDXRenderer>{body}</MDXRenderer>
          <Link to="/" className="inline-block mt-8 underline">
            &laquo; Go back to the site
          </Link>
        </article>
      </main>
    </LayoutTemplate>
)}

export default PostsLayout


export const query = graphql
    `
    query PostsByID($id: String!) {
        mdx(
            id: { eq: $id }
        ){
            body
            frontmatter {
                title
                date(formatString: "YYYY MMMM Do")
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
`
