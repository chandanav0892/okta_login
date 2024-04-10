import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState !== null && authState.isAuthenticated !== null) {
      setAuthenticated(true);
    } else {
      // Redirect to login page if authState is not available or isAuthenticated is null
      navigate('/login');
    }
  }, [authState, navigate]);

  console.log("authState",authState)
  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Protected Page</h2>
      {authenticated ? (
        <div>
          <p>This page is protected. Only authenticated users can access it.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not authenticated.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Protected;
