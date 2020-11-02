import React from "react"
import { FaRegCalendarAlt } from "react-icons/fa"

const PostOn = ({ date }) => (
  <div className="flex flex-row space-x-2">
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg> */}
      <FaRegCalendarAlt className="inline-block h-4 w-4 mr-1" />
      <span className="font-medium">{date}</span>
  </div>
);

export default PostOn
