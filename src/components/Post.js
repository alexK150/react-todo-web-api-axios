import React from 'react';

export const Post = ({posts, handleUpdate, handleDelete}) => {
  return (
    <div>
      {posts.length === 0 ?
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        : posts.map((post) =>
          <div key={post.id} className={'card post-card'}>
            <div>
              <h4>{post.title}</h4>
              <p className={'body-text'}>{post.body}</p>
            </div>
            <div>
              <button
                className="btn btn-info btn-sm"
                onClick={() => handleUpdate(post)}
              >Update
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(post)}
              >Delete
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}
