// filepath: /Users/mattazada/Desktop/Discussion Board/discussion-board-frontend/src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setError('');
            alert('Login successful');
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            console.log(err);
            
            setError('Invalid credentials');
        }
    };

    return (
        <div id='login-section' >
            <h2>Login</h2>
            <form onSubmit={handleSubmit} id='login-input'>
                <div>
                    {/* <label>Username:</label> */}
                    <input
                        type="text"
                        value={username}
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="password"
                        value={password}
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>Not a user? Register <a href="/register">Here</a></p>
        </div>
    );
}

export default Login;