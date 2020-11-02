import React from "react";
import PostDetails from "./post-details";
import PostExcerpt from "./post-excerpt";
import PostPreviewTitle from "./post-preview-title";

const PostPreview = ({ post }) => (
  <div className="flex flex-col my-4 space-y-3">
      <PostPreviewTitle path={post.path} title={post.title} className="text-2xl font-bold sm:text-4xl no-underline hover:underline"/>
      <PostDetails author={"Ahmed HABBACHI"} date={post.date} className="text-base font-normal"/>
      <PostExcerpt excerpt={post.excerpt} className="w-full text-lg font-medium leading-normal sm:text-2xl"/>
  </div>
);

export default PostPreview;
