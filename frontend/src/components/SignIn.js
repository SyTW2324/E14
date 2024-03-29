import React, { useState } from 'react';
import axios from 'axios';
import './Sign.css';

const PORT = window.env.BACKENDPORT
const IP = window.env.IP

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInMessage, setSignInMessage] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post(`http://${IP}:${PORT}/api/signin`, {
                email,
                password,
            });

            sessionStorage.setItem('token', response.data.token);

            console.log('Sign In Successful:', response.data.message);
            setSignInMessage(response.data.message);
            window.location.reload();


        } catch (error) {
            console.error('Error Signing In:', error.response.data.message);
            setSignInMessage(error.response.data.message);
        }
    };

    return (


            <div className="row">
                <div className="col"></div>
                {/*Empty column*/}


                <div className="col d-flex justify-content-center">
                    <div className="container">
                        <h2>Sign In</h2>
                        <form>
                            <label>
                                <p>Email: </p>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </label>
                            <label>
                                <p>Password:</p>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </label>
                            <button className="button_in_cont" type="button" onClick={handleSignIn}>
                                Sign In
                            </button>
                        </form>
                        {signInMessage && <p>{signInMessage}</p>}
                    </div>
                </div>
                <div className="col"></div>
                {/*Empty column*/}

            </div>

    );

};

export default SignIn;
