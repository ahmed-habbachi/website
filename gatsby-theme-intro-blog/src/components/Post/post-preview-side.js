import React from "react";
import PostDetails from "./post-details";
import PostExcerpt from "./post-excerpt";
import PostPreviewTitle from "./post-preview-title";

const PostPreviewMain = ({ posts }) => (
  <div className="mt-12">
    <h5 className="font-header font-semibold text-front text-md uppercase mb-3">
      Latest articles
    </h5>
    {posts.map(({node}) => (
      <div key={node.id} className="flex flex-col my-4 space-y-3">
        <PostPreviewTitle path={node.slug} title={node.frontmatter.title} showIcon className="text-sm font-medium leading-normal sm:text-md no-underline hover:underline"/>
        <PostDetails author={"Ahmed HABBACHI"} date={node.frontmatter.date} className="text-sm font-light hidden md:block lg:block xl:block"/>
        <PostExcerpt excerpt={node.excerpt} className="w-full text-sm font-normal leading-normal hidden md:block lg:block xl:block"/>
    </div>
    ))}
  </div>
);

export default PostPreviewMain;
