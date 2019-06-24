import React, { useState } from "react";

import { Button, Alert } from "reactstrap";

import { connect } from "react-redux";

import "./Auth.scss";

import { login, signup } from "../../actions";

const mapAuth = state => ({
  token: state.token,
  loggingIn: state.loggingIn,
  authError: state.authError
});

export const Auth = connect(
  mapAuth,
  { login, signup }
)(props => {
  // Call setIsSignup(bool) to set whether or not
  // we are signing up or logging in in state
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (props.authError !== error) {
    setError(props.authError);
  }

  if(props.token){
    props.history.push('/');
  }

  console.log('render called');

  const submit = e => {
    e.preventDefault();
    // If signing up, check if passwords match
    if (isSignup) {
      if (password !== confirmPassword) {
        console.log('mismatch!');
        setError("Passwords do not match!");
      } else props.signup(username, password);
    } else {
      props.login(username, password);
    }
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h1>{isSignup ? "Sign Up" : "Log in"}</h1>
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
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
      )}

      {error && <Alert color="danger">{error}</Alert>}

      <Button action="submit" color="primary" disabled={props.loggingIn}>
        {isSignup ? "SIGN UP" : "LOG IN"}
      </Button>
      {isSignup ? (
        <span>
          Already have an account?{" "}
          <Button onClick={() => setIsSignup(false)} color="link">
            Log in here
          </Button>
        </span>
      ) : (
        <span>
          Don't have an account?{" "}
          <Button onClick={() => setIsSignup(true)} color="link">
            Sign up here
          </Button>
        </span>
      )}
    </form>
  );
});
