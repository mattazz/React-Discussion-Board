import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const NewDiscussion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await api.post('/discussions', { title, content }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error creating discussion:", error);
            alert("Failed to create discussion. Please try again.");
        }
    };

    return (
        <div>
            <h1>Post a New Discussion</h1>
            <form id='new-disc-container'
                onSubmit={handleSubmit}>
                <div id='input-containers'>
                    {/* <label htmlFor="title">Title:</label> */}
                    <input
                        type="text"
                        id="title"
                        placeholder='Put title here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {/* <label htmlFor="content">Content:</label> */}
                    <textarea
                        id="content"
                        placeholder='Put content here'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit">Post Discussion</button>
                </div>
            </form>
        </div>
    );
};

export default NewDiscussion;
