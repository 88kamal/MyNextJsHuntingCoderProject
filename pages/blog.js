import React, { useEffect, useState } from 'react';
import styles from '../styles/Blog.module.css'
import Link from 'next/link';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';


// Step 1: Collect all the files from blogdata directory
// Step 2: Iterate through the and Display them

const Blog = (props) => {
    console.log(props)
    const [blogs, setBlogs] = useState(props.allBlogs);
    // useEffect(() => {

    // }, [])
    const [count, setCount] = useState(2)
 
    const fetchData = async () => {
      let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
      setCount(count + 2)
      let data = await d.json()
      setBlogs(data)
    };
   
    return(
        <div className=' container'>
        <div className={styles.mainnav}>
            <div className="blogs ">
                <h2 className=' text-center'>Popular Blogs</h2>

                <InfiniteScroll
                        dataLength={blogs.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={props.allCount !== blogs.length}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                       {blogs.map((blogitem) => {
                        return <div key={blogitem.slug} className={styles.blogItem}>
                            <Link href={`/blogpost/${blogitem.slug}`}>
                                <h5 style={{ cursor: 'pointer' }} className={styles.blogItem}><span>{blogitem.id}</span> {blogitem.title}</h5></Link>
                            <p className={styles.blogItemp}>{blogitem.metadesc.substr(0, 140)}...</p>
                            <Link href={`/blogpost/${blogitem.slug}`}><button className={styles.btn}>Read More</button></Link>
                        </div>
                    })}
                    </InfiniteScroll>
            </div>
        </div>
    </div>
    )
};


export async function getStaticProps(context) {
    let data = await fs.promises.readdir("blogdata");
    let myfile;
    let allBlogs = [];
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        console.log(item)
        myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
        allBlogs.push(JSON.parse(myfile))
    }

    return {
        props: { allBlogs }, // will be passed to the page component as props
    }
}

export default Blog;