import React from "react";
import PostDetails from "./post-details";
import PostExcerpt from "./post-excerpt";
import PostPreviewTitle from "./post-preview-title";

const PostPreviewMain = ({ posts }) => (
  <div className="mt-12">
    <h5 className="font-header font-bold text-front text-lg uppercase mb-3">
      Latest articles
    </h5>
    {posts.map((edge, index) => (
      // <PostPreviewMain key={index} post={{
      //   title: edge.node.frontmatter.title,
      //   path: edge.node.frontmatter.path,
      //   date: edge.node.frontmatter.date,
      //   excerpt: edge.node.excerpt
      // }} />
      <div key={index} className="flex flex-col my-4 space-y-3">
        <PostPreviewTitle path={edge.node.frontmatter.path} title={edge.node.frontmatter.title} showIcon className="text-sm font-medium leading-normal sm:text-lg no-underline hover:underline"/>
        <PostDetails author={"Ahmed HABBACHI"} date={edge.node.frontmatter.date} className="text-base font-normal"/>
        <PostExcerpt excerpt={edge.node.excerpt} className="w-full text-md font-normal leading-normal sm:text-lg"/>
    </div>
    ))}
  </div>
);

export default PostPreviewMain;
