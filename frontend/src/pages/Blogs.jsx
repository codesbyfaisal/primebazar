import { useContext, useEffect, useState } from 'react'
import { Title, BlogCard, NewsLatter } from '../components/index.js'
import { ShopContext } from '../context/ShopContext'

function Blogs() {
  const { blogs } = useContext(ShopContext);
  const [blogsData, setBlogsData] = useState([]);
  
  useEffect(() => {
    setBlogsData(blogs);
    console.log(blogs);
  }, [blogs]);
  

  return (
    <section className='px-[2vw] sm:px-[4vw] md:px-[6vw] my-12'>
      <Title text1={"Latest"} text2={"Blogs"} line={true} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>

        {blogsData.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.imageUrl}
            date={blog.date}
          />
        ))}

        <BlogCard title="Blog Title" author="Author Name" description="Blog Description" imageUrl="https://images.unsplash.com/photo-1605513524006-063ed6ed31e7?q=80&w=1504&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" date="2022-01-01" />

      </div>

      <NewsLatter />

    </section>
  )
}

export default Blogs