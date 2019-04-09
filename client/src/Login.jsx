import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { setProfile } from './actionCreators';

function Login({ setProfileDispatch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    // handle click
    try {
      await axios.post('/api/login', { username, password });
      setProfileDispatch(username);
    } catch (err) {
      console.log(err.message); // eslint-disable-line no-console
    }
    // console.log(user);
  }

  return (
    <div className="login">
      <h1>Log In</h1>
      <form action="" onSubmit={onSubmit}>
        <div>
          <input
            type="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" />
      </form>
      <span>
        New user?
        <Link to="/register"> Register here</Link>
      </span>
    </div>
  );
}

Login.propTypes = {
  setProfileDispatch: PropTypes.func,
};

Login.defaultProps = {
  setProfileDispatch: () => {},
};

const mapDispatchToProps = {
  setProfileDispatch: setProfile,
};

export default connect(null, mapDispatchToProps)(Login);
