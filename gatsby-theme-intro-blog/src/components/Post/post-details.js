import React from "react";
// import PostBy from "./post-by";
import PostOn from "./post-on";

const PostDetails = ({date, className}) => (
  <div className={`flex flex-col space-x-0 space-y-2 sm:space-x-2 sm:space-y-0 sm:flex-row ${className}`}>
      {/* <PostBy author={author} /> */}
      <PostOn date={date} />
  </div>
);

export default PostDetails;
