import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Post} from "./components/Post";
import {Search} from "./components/Search";
import {Pagination} from "./components/Pagination";

const basePostsUrl = 'https://jsonplaceholder.typicode.com/posts';

export const App = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  // eslint-disable-next-line
  useEffect(async () => {
    let res = await axios.get(basePostsUrl)
    setPosts(res.data)
  }, [])

  //Delete
  const handleDelete = async (post) => {
    await axios.delete(`${basePostsUrl}/${post.id}`)

    const innerPosts = posts.filter(p => p.id !== post.id)
    setPosts(innerPosts)

    console.log(`${post.id} deleted`)
  }

  //Add
  const handleAdd = async () => {
    const postObj = {title: 'Hello', body: 'Say hello!'}
    const {data: post} = await axios.post(basePostsUrl, postObj)
    const resPosts = [post, ...posts]
    setPosts(resPosts)
  }

  //Update
  const handleUpdate = async (post) => {
    post.title = 'Updated'
    post.body = 'Updated'
    await axios.put(`${basePostsUrl}/${post.id}`, post)

    const prevPosts = [...posts]
    const index = prevPosts.indexOf(post)
    prevPosts[index] = {...post}
    setPosts(posts)
    console.log(`${post.id} updated`)
  }

  //Get current post for pagination
  const indexOfTheLastPost = currentPage * postsPerPage
  const indexOfTheFirstPost = indexOfTheLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfTheFirstPost, indexOfTheLastPost)

  //Filter Search
  const filteredPosts = currentPosts.filter((post) => {
    return post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  })

  //Pagination function
  const paginate = (pageNum) => setCurrentPage(pageNum)

  return (
    <div className={'app'}>
      <button className="btn btn-primary" onClick={handleAdd}>
        + Add Post
      </button>
      <Search setSearch={setSearch}/>
      <div>
        <h1>Posts {filteredPosts.length}</h1>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}/>
      </div>
      <Post
        posts={filteredPosts}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        baseUrl={basePostsUrl}/>
    </div>
  )
}
