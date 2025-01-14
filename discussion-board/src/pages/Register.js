// filepath: /Users/mattazada/Desktop/Discussion Board/discussion-board-frontend/src/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/register', { username, password });
            setSuccess('User registered successfully');
            setError('');
        } catch (err) {
            console.log(err);
            setError('Registration failed');
            setSuccess('');
        }
    };

    return (
        <div id='login-section'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} id='login-input'>
                <div>
                    {/* <label>Username:</label> */}
                    <input
                        type="text"
                        value={username}
                        placeholder='username'
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
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Register</button>
            </form>
            <p>Already a user? Login <a href="/login">Here</a></p>

        </div>
    );
}

export default Register;