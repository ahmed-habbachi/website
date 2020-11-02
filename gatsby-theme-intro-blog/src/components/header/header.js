import React from "react"
import { Link } from "gatsby"
import { FaEnvelope, FaNewspaper } from "react-icons/fa"
import { ProfileType } from "../../types"

const Header = ({ initials }) => (
  <header className="flex justify-between p-4 lg:px-8">
    <Link to="/">
      <span className="inline-flex w-14 h-14 lg:mt-4 font-header font-bold text-xl justify-center items-center text-center text-front border-2 border-solid border-front rounded-full">
        {initials}
      </span>
    </Link>
    <div className="inline-flex">
      <Link className="flex w-14 h-14 font-header font-semibold px-2 bg-lead rounded-full text-lead-text justify-center items-center leading-tight lg:w-auto lg:h-auto lg:px-6 lg:py-2 lg:rounded-lg lg:self-start lg:mt-4 hover:opacity-75 transition-opacity duration-150"
        to="/blog">
        <FaNewspaper className="inline-block h-5 w-5 lg:mr-2" />
        <span className="hidden lg:block">Blog</span>
      </Link>
      <a className="flex w-14 h-14 font-header font-semibold px-2 bg-lead rounded-full text-lead-text justify-center items-center leading-tight lg:w-auto lg:h-auto lg:px-6 lg:py-2 lg:rounded-lg lg:self-start lg:mt-4 hover:opacity-75 transition-opacity duration-150 ml-4"
        href="#contact">
        <FaEnvelope className="inline-block h-5 w-5 lg:mr-2" />
        <span className="hidden lg:block">Contact me</span>
      </a>
    </div>
  </header>
)

Header.propTypes = {
  initials: ProfileType.initials,
}

export default Header
