import React from "react";
import PostDetailsSide from "./post-details-side";
import PostExcerpt from "./post-excerpt";
import PostPreviewTitle from "./post-preview-title";

const PostPreviewSide = ({ posts }) => (
  <div className="mt-12">
    <h5 className="font-header font-semibold text-front text-md uppercase mb-3">
      Latest articles
    </h5>

    {posts.map(({node}) => {
      const {
        frontmatter: {title, date, category, tags},
        slug,
        excerpt
      } = node
      return (
      <div key={node.id} className="flex flex-col my-4 space-y-3">
        <PostPreviewTitle path={node.slug} title={node.frontmatter.title} showIcon className="text-sm font-medium leading-normal sm:text-md no-underline hover:underline"/>
        <PostDetailsSide
          post={{
            title: title,
            path: slug,
            date: date,
            category: category,
            tags: tags,
            excerpt: excerpt
          }} className="text-sm font-light hidden md:block lg:block xl:block"/>
        <PostExcerpt excerpt={node.excerpt} className="w-full text-sm font-normal leading-normal hidden md:block lg:block xl:block"/>
      </div>
      )
    })}
  </div>
);

export default PostPreviewSide;
