import React, {useState, useEffect} from "react";
import axios from 'axios';
import './App.css';
import Post from "./components/Post";
import Search from "./components/Search";

const basePostsUrl = 'https://jsonplaceholder.typicode.com/posts';

const App = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')

// eslint-disable-next-line
  useEffect(async () => {
    let res = await axios.get(basePostsUrl)
    setPosts(res.data)
  }, [])

  const handleDelete = async (post) => {
    await axios.delete(`${basePostsUrl}/${post.id}`)

    const innerPosts = posts.filter(p => p.id !== post.id)
    setPosts(innerPosts)

    console.log(`${post.id} deleted`)
  }

  const handleAdd = async () => {
    const postObj = {title: 'Hello', body: 'Say hello!'}
    const {data: post} = await axios.post(basePostsUrl, postObj)
    const resPosts = [post, ...posts]
    setPosts(resPosts)
  }

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

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className={'app'}>
      <button className="btn btn-primary" onClick={handleAdd}>
        + Add Post
      </button>
      <Search setSearch={setSearch}/>
      <div>
        <h1>Posts {filteredPosts.length}</h1>
      </div>
      <Post posts={filteredPosts} handleUpdate={handleUpdate} handleDelete={handleDelete} baseUrl={basePostsUrl}/>
    </div>
  )
}

export default App;
