import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import axios from 'axios';

const Discussion = () => {
    const { discussionId } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    const fetchPosts = async () => {
        try {
            const response = await api.get(`/discussions/${discussionId}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const response = await api.get(`/discussions/${discussionId}`);
                setDiscussion(response.data);
            } catch (error) {
                console.error('Error fetching discussion:', error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await api.get(`/discussions/${discussionId}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchDiscussion();
        fetchPosts();
    }, [discussionId]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await api.post(`/discussions/${discussionId}/posts`, { content: newPostContent }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts([...posts, response.data]);
            setNewPostContent('');
            fetchPosts(); 
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/discussions/${discussionId}/like`);
            setDiscussion(response.data);
            fetchPosts(); 
        } catch (error) {
            console.error('Error liking discussion:', error);
        }
    };

    const handleDislike = async () => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/discussions/${discussionId}/dislike`);
            setDiscussion(response.data);
            fetchPosts(); 
        } catch (error) {
            console.error('Error disliking discussion:', error);
        }
    };

    const handlePostLike = async (postId) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/discussions/posts/${postId}/like`);
            setPosts(posts.map(post => post._id === postId ? response.data : post));
            fetchPosts(); 
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handlePostDislike = async (postId) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/discussions/posts/${postId}/dislike`);
            setPosts(posts.map(post => post._id === postId ? response.data : post));
            fetchPosts(); 
        } catch (error) {
            console.error('Error disliking post:', error);
        }
    };

    
    if (!discussion) {
        return <div>Loading...</div>;
    }

    return (
        <div id='in-post-container'>
            <div id='discussion-header'>
                
                <h1>{discussion.title}</h1>
                <p>{discussion.content}</p>
            </div>
            <div id='like-dislike'>
                            <p id='total-likes'>Total Likes: {discussion.likes - discussion.dislikes}</p>                                <div id='like-dislike-button-container'>
                                <button onClick={() => handleLike(discussion._id)}>Like 👍 ({discussion.likes})</button>
                                <button onClick={() => handleDislike(discussion._id)}>Dislike 👎 ({discussion.dislikes})</button>
                                </div>
                            </div>
            <div id='comment-container'>
            <h2>Comments</h2>
            <ul>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <li key={post._id}>
                                <p>{post.content}</p>
                                <p className='italic'>By: {post.author.username}</p>
                                <div id='like-dislike-post'>
                                    <button onClick={() => handlePostLike(post._id)}>Like 👍 ({post.likes})</button>
                                    <button onClick={() => handlePostDislike(post._id)}>Dislike 👎 ({post.dislikes})</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No comments yet.</li>
                    )}
                </ul>
            </div>
            <div id='add-post-container'> 
                <h3>Add a Comment</h3>
                <form onSubmit={handlePostSubmit} id='post-form-container'>
                    <div>
                        <label htmlFor="newPostContent"></label>
                        <textarea
                            id="newPostContent"
                            className='text-area'
                            value={newPostContent}
                            placeholder='Add comment here'
                            onChange={(e) => setNewPostContent(e.target.value)}
                        />
                    </div>
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

export default Discussion;