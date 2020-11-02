import React from "react"

const PostBy = ({ author }) => {
  return (
      <div className="flex flex-row space-x-2">
          <span>By {author}</span>
      </div>
  );
}

export default PostBy
