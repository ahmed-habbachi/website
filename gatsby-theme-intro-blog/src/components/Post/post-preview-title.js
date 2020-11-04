import React from "react";
import { Link } from 'gatsby';
import { FaRegNewspaper } from "react-icons/fa"

const PostPreviewTitle = ({ path, title, showIcon, className }) => (


      <Link to={`/${path}`} className={`${className} relative`}>
        {showIcon && <FaRegNewspaper className="inline-block h-5 w-5 md:mr-2 mr-1" />}
        {title}
      </Link>
);

export default PostPreviewTitle;
