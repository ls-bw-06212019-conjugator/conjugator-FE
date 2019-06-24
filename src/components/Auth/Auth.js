import React, { useState } from "react";

import { Button, Alert } from "reactstrap";

import './Auth.scss';

export const Auth = props => {
  // Call setIsSignup(bool) to set whether or not
  // we are signing up or logging in in state
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    // If signing up, check if passwords match
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h1>{isSignup ? 'Sign Up' : 'Log in'}</h1>
      <div className="field">
        <label>Username</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {/* Second 'confirm password' field if signing up is required */}
      {isSignup && (
        <div className="field">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
      )}

      {error && <Alert color="danger">{error}</Alert>}

      <Button action="submit" color="primary">
        {isSignup ? "SIGN UP" : "LOG IN"}
      </Button>
      { isSignup ? (
        <span>Already have an account? <Button onClick={() => setIsSignup(false)} color='link'>Log in here</Button></span>
      ) : (
      <span>Don't have an account? <Button onClick={() => setIsSignup(true)} color='link'>Sign up here</Button></span>
      )
      }
    </form>
  );
};