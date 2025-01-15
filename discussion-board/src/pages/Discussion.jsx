import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const Discussion = () => {
    const { discussionId } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

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
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    if (!discussion) {
        return <div>Loading...</div>;
    }

    return (
        <div id='in-post-container'>
            <h1>{discussion.title}</h1>
            <p>{discussion.content}</p>
            <div id='comment-container'>
            <h2>Comments</h2>
                <ul>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <li key={post._id}>
                                <p>{post.content}</p>
                                <p className='italic'>By: {post.author.username}</p>
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