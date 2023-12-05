import React from 'react';
import { usePageContext } from './PageContext';
import './Navigation.css';
const axios = require('axios');

const token = sessionStorage.getItem('token');
async function isTokenValid() {
    try {
        const response = await axios.get('http://your-api-base-url/validate-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.status === 200;
    } catch (error) {
        // If the request fails or the token is invalid, return false
        return false;
    }
}

const Navigation = () => {
    const { handlePageChange } = usePageContext();
    return (
        <header>
            <div className="row">
                <div className="col">
                    <img src="../logo.jpg" className="logo" alt="Logo"  />
                </div>
                <div className="col d-flex justify-content-center">
                    <button onClick={() => handlePageChange('home')}>Home</button>
                    <button onClick={() => handlePageChange('subscriptions')}>Subscriptions</button>
                    <button onClick={() => handlePageChange('adds')}>Additions</button>
                    <button onClick={() => handlePageChange('search')}>Search</button>
                </div>
                <div className="col d-flex justify-content-end">


                        {(token && isTokenValid) ? (
                            <button onClick={() => handlePageChange('profile')}>Profile</button>
                        ) : (
                            <div>
                                <button onClick={() => handlePageChange('signUp')}>Sign Up</button>
                                <button onClick={() => handlePageChange('signIn')}>Sign In</button>
                            </div>
                        )}
                    </div>

            </div>
        </header>
    );
};

export default Navigation;
