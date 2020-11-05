import React from "react"
import { AiFillTags } from "react-icons/ai"

const PostTags = ({ tags }) => {
  return (
  <div className="text-sm">
    <AiFillTags className="inline-block h-5 w-5 pb-1 m-1" />
    {tags && tags.map((tag, index) => (
      <span key={index} className="font-medium">#{tag} </span>
    ))}
  </div>
)};

export default PostTags
