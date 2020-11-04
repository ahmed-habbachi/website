import { graphql } from "gatsby"
import React from "react"
import LayoutTemplate from "../templates/layout"
import MainContent from "../components/main-content/main-content"
import "../styles/style.css"

const IndexPage = ({ data }) => {
  const { history, profile, projects, allMdx } = data

  return (
      <LayoutTemplate posts={allMdx.edges}>
        <MainContent
          profile={profile}
          history={history.nodes}
          projects={projects.nodes}
        />
      </LayoutTemplate>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        showThemeLogo
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
    history: allWorkHistoryYaml {
      nodes {
        ...WorkHistoryFragment
      }
    }
    projects: allProjectsYaml {
      nodes {
        ...ProjectFragment
      }
    }
    allMdx (limit: 3, sort: {fields: frontmatter___date, order: DESC}){
      edges {
        node {
          id
          slug
          excerpt
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
        }
      }
    }
  }
`
