import { StaticQuery, graphql } from "gatsby"
import React from "react"
import CustomFonts from "../components/custom-fonts/custom-fonts"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import SEO from "../components/seo/seo"
import Sidebar from "../components/sidebar/sidebar"
import StructuredData from "../components/structured-data/structured-data"
import "../styles/style.css"

const PostTemplate = ({children, posts}) => (
  <StaticQuery
    query={ graphql`
        query {
          site {
            siteMetadata {
              showThemeLogo
              showPostsInIndex
            }
          }
          profile: profileYaml {
            ...ProfileFragment
          }
          social: allSocialYaml(filter: { url: { ne: null } }) {
            nodes {
              ...SocialFragment
            }
          }
        }
      `
    }
    render={data => (
      <div className="min-h-screen antialiased bg-back leading-normal font-text text-front">
        <SEO />
        <StructuredData profile={data.profile} social={data.social.nodes} />
        <CustomFonts />

        <Header initials={data.profile.initials} />

        <div className="min-h-full md:max-w-screen-sm lg:max-w-screen-xl mx-auto px-4 flex flex-wrap pt-4 my-8">
          <Sidebar profile={data.profile} social={data.social.nodes} posts={posts} showPostsInIndex={data.site.siteMetadata.showPostsInIndex}/>
          {children}
        </div>

        <Footer
          name={data.profile.name}
          showThemeLogo={data.site.siteMetadata.showThemeLogo}
        />
      </div>
    )}
  />
)

export default PostTemplate
