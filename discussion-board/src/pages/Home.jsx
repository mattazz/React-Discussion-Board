// filepath: /Users/mattazada/Desktop/Discussion Board/discussion-board/src/pages/Home.js
import React from 'react';

function Home() {
    return (
        <div class="centered">
            <h1>Welcome to the Discussion Board</h1>
            <img className='rounded' src="./db_graphic1.jpg" alt="" srcset="" />
            <p>Sign up and connect with students to discuss topics, learn new things, and share knowledge.</p>

            <div id='login-register'>
                <a className='a-button' href="/login">Login</a> <br></br> <br />
                Not a user yet? <p><a href="/register">Register</a> here.</p>
            </div>
        </div>
    );
}

export default Home;