import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, description, imageUrl, date }) => {
  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        {/* Blog Image */}
        <Link to={`/blog/${id}`} className="block overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </Link>

        {/* Blog Info */}
        <div className="p-4">
          <Link className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
            {title}
          </Link>
          <p className="text-sm mt-2 line-clamp-3">{description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs">{date}</span>
            <Link to={`/blog/${id}`}>Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
