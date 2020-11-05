import React from "react"
import { FaRegCalendarAlt } from "react-icons/fa"

const PostOn = ({ date }) => (
  <div className="text-sm">
      <FaRegCalendarAlt className="inline-block h-5 w-5 pb-1" />
      <span className="font-medium">{date}</span>
  </div>
);

export default PostOn
