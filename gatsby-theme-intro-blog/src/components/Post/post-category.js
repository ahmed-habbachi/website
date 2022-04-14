import React from "react"
import { FaTerminal, FaTools } from "react-icons/fa"
import { AiFillEdit, AiFillDatabase } from "react-icons/ai"

const PostCategory = ({ category }) => {
  return (
  <div className="text-sm">
    {getCategoryIcon(category)}
    <span className="font-medium">{category}</span>
  </div>
)};

export default PostCategory

function getCategoryIcon(category) {
  let categoryIcon = <AiFillEdit className="inline-block h-5 w-5 pb-1 m-1" />;
  if (category === 'IT') {
    categoryIcon = <AiFillDatabase className="inline-block h-5 w-5 pb-1 m-1" />;
  } else if (category === 'Development') {
    categoryIcon = <FaTerminal className="inline-block h-5 w-5 pb-1 m-1" />;
  } else if (category === 'Tools') {
    categoryIcon = <FaTools className="inline-block h-5 w-5 pb-1 m-1" />;
  }
  return categoryIcon;
}

