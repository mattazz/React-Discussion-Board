import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Dashboard() {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/discussions');
                setDiscussions(response.data);
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };

        fetchDiscussions();
    }, []);

    function getCurrentDateTime(){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return [`${year}-${month}-${day}`, `${hours}:${minutes}:${seconds}`];
    }

    return (
        <div>
            <div id='dashboard-greeting'>
                <h1>Do you best today.</h1>
                <h2>{getCurrentDateTime()[0]}</h2>
            </div>
            <div>
                <h1>Discussions</h1>
                <ul>
                    {discussions.map(discussion => (
                        <li key={discussion._id}>
                            <Link to={`/discussion/${discussion._id}`}>{discussion.title}</Link>
                        </li>
                    ))}
                </ul>
                <div id='post-new-disc'>
                <Link to="/new-discussion">Post a new discussion</Link>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;