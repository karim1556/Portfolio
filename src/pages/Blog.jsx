import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import apiUrl from '../config'; // Import the apiUrl

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [newPost, setNewPost] = useState({ title: '', summary: '', content: '' });
  const [editPost, setEditPost] = useState({ id: '', title: '', summary: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState({ show: false, text: '', type: '' });

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/blog`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Error: Data is not an array');
        }
      })
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  // Fetch the schema to generate avatars
  useEffect(() => {
    axios.get('https://api.dicebear.com/9.x/bottts-neutral/schema.json')
      .then(response => {
        // Handle response and determine how to use it
        console.log('Schema:', response.data);
      })
      .catch(error => console.error('Error fetching DiceBear schema:', error));
  }, []);

  const showAlert = ({ show, text, type }) => {
    setAlert({ show, text, type });
    setTimeout(() => setAlert({ show: false, text: '', type: '' }), 3000);
  };

  const handleReadMore = (id) => {
    axios.get(`${apiUrl}/api/blog/${id}`)
      .then(response => {
        setSelectedPost(response.data);
        return axios.get(`${apiUrl}/api/blog/${id}/comments`);
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          console.error('Error: Comments data is not an array');
        }
      })
      .catch(error => console.error('Error fetching blog post:', error));
  };

  const handleAddComment = (postId) => {
    const newComment = {
      author: 'Bunny', // Replace with actual author data
      text: commentText,
      date: new Date(),
      // Replace with dynamic avatar URL based on schema data
      avatar: `https://api.dicebear.com/9.x/bottts-neutral/${encodeURIComponent(commentText)}.svg`,
    };
    axios.post(`${apiUrl}/api/blog/${postId}/comments`, newComment)
      .then(response => {
        if (response.data) {
          setComments([...comments, response.data]);
          setCommentText('');
        } else {
          console.error('Error: Failed to add comment');
        }
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  const handleDeletePost = (id) => {
    axios.delete(`${apiUrl}/api/blog/${id}`)
      .then(response => {
        setPosts(posts.filter(post => post._id !== id));
        setSelectedPost(null);
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  const handleEditPost = (post) => {
    setEditPost({
      id: post._id,
      title: post.title,
      summary: post.summary,
      content: post.content,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditPost({ id: '', title: '', summary: '', content: '' });
    setIsEditing(false);
  };

  const handleUpdatePost = () => {
    axios.put(`${apiUrl}/api/blog/${editPost.id}`, editPost)
      .then(response => {
        const updatedPosts = posts.map(post => post._id === editPost.id ? response.data : post);
        setPosts(updatedPosts);
        setIsEditing(false);
        setEditPost({ id: '', title: '', summary: '', content: '' });
        showAlert({ show: true, text: 'Post updated successfully', type: 'success' });
      })
      .catch(error => console.error('Error updating post:', error));
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddPost = () => {
    axios.post(`${apiUrl}/api/blog`, newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', summary: '', content: '' });
        showAlert({ show: true, text: 'Post created successfully', type: 'success' });
      })
      .catch(error => console.error('Error creating new post:', error));
  };

  const handleLogin = () => {
    // Mock admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'Sonybravia';
    if (username === adminUsername && password === adminPassword) {
      setIsAdmin(true);
      setIsLoggedIn(true);
      showAlert({ show: true, text: 'Login successful', type: 'success' });
    } else {
      showAlert({ show: true, text: 'Invalid credentials', type: 'error' });
    }
  };

  return (
    <section className='max-container'>
      {!isLoggedIn && (
        <div className="login-form">
          <h2 className="subhead-text">Admin Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <button onClick={handleLogin} className="btn mt-2 inline-block">Login</button>
        </div>
      )}

      <h1 className='head-text'>Blog</h1>

      {isAdmin && isLoggedIn && !isEditing && (
        <div className="mb-8">
          <h2 className="subhead-text">Create New Post</h2>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleNewPostChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="text"
            name="summary"
            value={newPost.summary}
            onChange={handleNewPostChange}
            placeholder="Summary"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleNewPostChange}
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <button onClick={handleAddPost} className="btn mt-2 inline-block">Add Post</button>
        </div>
      )}

      {isAdmin && isLoggedIn && isEditing && (
        <div className="mb-8">
          <h2 className="subhead-text">Edit Post</h2>
          <input
            type="text"
            name="title"
            value={editPost.title}
            onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="text"
            name="summary"
            value={editPost.summary}
            onChange={(e) => setEditPost({ ...editPost, summary: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <textarea
            name="content"
            value={editPost.content}
            onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          <button onClick={handleUpdatePost} className="btn mt-2 inline-block mr-2">Update Post</button>
          <button onClick={handleCancelEdit} className="btn mt-2 inline-block">Cancel</button>
        </div>
      )}

      {selectedPost ? (
        <article className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
          <h2 className="subhead-text">{selectedPost.title}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{selectedPost.content}</p>
          {isAdmin && isLoggedIn && (
            <button onClick={() => handleDeletePost(selectedPost._id)} className="btn mt-4 inline-block mr-2">Delete Post</button>
          )}
          <button onClick={() => setSelectedPost(null)} className="btn mt-4 inline-block">Back to Blog</button>
          <div className="mt-4">
            <h3 className="subhead-text">Comments</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mt-2 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <img src={comment.avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
                    <strong>{comment.author}:</strong> {comment.text}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleAddComment(selectedPost._id)}
                className="btn mt-2 inline-block"
              >
                Submit
              </button>
            </div>
          </div>
        </article>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid mt-8"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <article className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6" key={post._id}>
              <h2 className="subhead-text">{post.title}</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{post.summary}</p>
              <button onClick={() => handleReadMore(post._id)} className="btn mt-4 inline-block mr-2">Read More</button>
              {isAdmin && isLoggedIn && (
                <>
                  <button onClick={() => handleEditPost(post)} className="btn mt-4 inline-block mr-2">Edit Post</button>
                  <button onClick={() => handleDeletePost(post._id)} className="btn mt-4 inline-block">Delete Post</button>
                </>
              )}
              <div className="mt-4 flex">
                <a href={'https://github.com/karim1556'} className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 mr-4">
                  <FaGithub className="text-2xl" />
                </a>
                <a href={post.url} className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200">
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </article>
          ))}
        </Masonry>
      )}

      <footer className="mt-8">
        <div className="max-container pt-8 pb-8 sm:pt-8 sm:pb-4 ">
          <p className="text-sm text-gray-700 dark:text-gray-300">&copy; 2024 Karim Shaikh</p>
          <div className="flex mt-4 md:m-0">
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Blog;
