import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



/**
 * Main dashboard for the Discussion board where the user can see
 * all the returned discussions from MongoDB
 * 
 * @return {*} 
 */
function Dashboard() {
    const [discussions, setDiscussions] = useState([]);

    const fetchDiscussions = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/discussions');
            const sortedDiscussions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setDiscussions(sortedDiscussions);
        } catch (error) {
            console.error('Error fetching discussions:', error);
        }
    };

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/discussions');
                const sortedDiscussions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDiscussions(sortedDiscussions);
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };

        fetchDiscussions();
    }, []);

    const handleLike = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/discussions/${id}/like`);
            setDiscussions(discussions.map(discussion => discussion._id === id ? response.data : discussion));
            fetchDiscussions()
        } catch (error) {
            console.error('Error liking discussion:', error);
        }
    };

    const handleDislike = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/discussions/${id}/dislike`);
            setDiscussions(discussions.map(discussion => discussion._id === id ? response.data : discussion));
            fetchDiscussions()

        } catch (error) {
            console.error('Error disliking discussion:', error);
        }
    };



    /**
     * Gets current date / time and returns in a custom format
     *
     * @return {[Date, Time]} 
     */
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return [`${year}-${month}-${day}`, `${hours}:${minutes}:${seconds}`];
    }


    /**
     *Formats dateString format into local string
     *
     * @param {*} dateString
     * @return {*} 
     */
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    /**
     *Shortens long string into short previews for the dashboard list. 
     *
     * @param {string} str
     * @return {string} 
     */
    function shortenString(str) {
        return str.length > 300 ? str.substring(0, 300) + '...' : str;
    }


    /**
     * Returns a random greeting from the array.
     *
     * @return {string}
     */
    function randomGreeting() {
        const greetList = ["Do you best today!", "Have some fun.", "Seize the day", "Ad aspera ad astra.", "Magis"]
        // return greetList[Math.floor(Math.random() * greetList.length)];
        return greetList[0]
    }


    return (
        <div>
            <div id='dashboard-greeting'>
                <h1>{randomGreeting()}</h1>
                <h2>{getCurrentDateTime()[0]}</h2>
            </div>
            <div id='discussion-container'>
                <h1>Latest Discussions</h1>
                <ul id='discussion-list-container'>
                    {discussions.map(discussion => (
                        <li key={discussion._id}>
                                <Link id='discussion-list-user' to={`/discussion/${discussion._id}`}><strong>{(discussion.title)}</strong> by {discussion.author.username} on {formatDate(discussion.createdAt)}</Link>  
                            <p>{'>'}{shortenString(discussion.content)}</p>
                            <div id='like-dislike'>
                                <p id='total-likes'>Total Likes: {discussion.likes - discussion.dislikes}</p>                                <div id='like-dislike-button-container'>
                                    <button onClick={() => handleLike(discussion._id)}>Like 👍 ({discussion.likes})</button>
                                    <button onClick={() => handleDislike(discussion._id)}>Dislike 👎 ({discussion.dislikes})</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div id='post-new-container'>
                <div id='post-new-disc'>
                    <Link to="/new-discussion">Post a new discussion</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;