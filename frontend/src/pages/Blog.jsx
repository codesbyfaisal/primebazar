import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Blog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { blogs } = useContext(ShopContext);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const selectedBlog = blogs.find((b) => b._id === blogId);

    if (selectedBlog) {
      setBlog(selectedBlog);
    } else {
      navigate("/error", { state: { code: 404, message: "Blog Not Found" } });
    }
  }, [blogId, blogs, navigate]);

  if (!blog) {
    // Optionally, you can render a loading state here while the blog is being fetched
    return <div>Loading...</div>;
  }

  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] my-12 max-w-4xl mx-auto">
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
        <div className="flex items-center mb-4">
          <img
            className="h-12 w-12 rounded-full mr-4"
            src="https://via.placeholder.com/50"
            alt={blog.author}
          />
          <div>
            <p className="text-lg font-semibold">{blog.author}</p>
            <p className="text-sm">
              Published on {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </header>

      {/* Blog Image */}
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-96 object-cover rounded mb-8 shadow-lg"
      />

      {/* Blog Content */}
      <article className="prose lg:prose-xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-lg mb-6">{blog.content.introduction}</p>

        {blog.content.sections.map((section, index) => (
          <div key={index} id={`section-${index}`} className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">{section.title}</h3>
            <p className="text-lg">{section.content}</p>
          </div>
        ))}

        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p className="text-lg">{blog.content.conclusion}</p>
      </article>

      {/* Author Bio */}
      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">About the Author</h2>
        <div className="flex items-center">
          <img
            className="h-16 w-16 rounded-full mr-4"
            src="https://via.placeholder.com/100"
            alt={blog.author}
          />
          <div>
            <p className="text-lg font-semibold">{blog.author}</p>
            <p className="text-sm">
              Muhammad Faisal is a seasoned eCommerce expert with over a decade of experience
              helping businesses optimize their online presence. His focus is on providing
              valuable insights into improving customer experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs
            .filter((b) => b._id !== blogId)
            .slice(0, 3) // Show only 3 related blogs
            .map((relatedBlog) => (
              <div key={relatedBlog._id} className="border rounded bg-white shadow-sm hover:shadow-lg transition">
                <img
                  src={relatedBlog.imageUrl}
                  alt={relatedBlog.title}
                  className="h-40 w-full object-cover rounded"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{relatedBlog.title}</h3>
                  <p className="text-sm mb-4">
                    {new Date(relatedBlog.date).toLocaleDateString()}
                  </p>
                  <Link to={`/blog/${relatedBlog._id}`} className="text-blue-500 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
