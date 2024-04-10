import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  useEffect(() => {
    if (authState.isAuthenticated !== null) {
      setAuthenticated(authState.isAuthenticated);
    } else {
      navigate('/');
    }
  }, [authState.isAuthenticated]);

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
