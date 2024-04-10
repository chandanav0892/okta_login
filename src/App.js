// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from './components/Home';
import Protected from './components/Protected';
import Login from './components/Login';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-22920066.okta.com/oauth2/default',
  clientId: '0oagbgzzu5EtICb6E5d7',
  redirectUri: window.location.origin + '/login/callback',
});

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  window.location.assign(originalUri);
};

const App = () => {
  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </Security>
    </Router>
  );
};

export default App;
