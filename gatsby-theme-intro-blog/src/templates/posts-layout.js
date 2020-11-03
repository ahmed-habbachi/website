import React from "react"
import { Link } from "gatsby"
import LayoutTemplate from "../templates/layout"
import "../styles/style.css"

const PostsLayout = ({children}) => (
    <LayoutTemplate>
      <main className="lg:w-2/3 lg:pl-8 xl:pl-12">
        <div className="py-12">
          {children}
          <Link to="/" className="inline-block mt-8 underline">
            &laquo; Go back to the site
          </Link>
        </div>
      </main>
    </LayoutTemplate>
)

export default PostsLayout
