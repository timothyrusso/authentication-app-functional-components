import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';
import './styles/Login.css';

const Login = ({ handleLogin }) => {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      return;
    }
    auth.authorize(inputs.username, inputs.password)
      .then((data) => {
        if (data.jwt) {
          setInputs({
            username: '',
            password: ''
          })
          handleLogin(data.user.en_cal_goal.calGoal);
          history.push('/diary');
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("Something went wrong, please try again.")
      });

  }

  return (
    <div className="login">
      <p className="login__welcome">
        Welcome back!
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <label htmlFor="username">
          Username:
        </label>
        <input required id="username" name="username" type="text" value={inputs.username} onChange={handleChange} />
        <label htmlFor="password">
          Password:
        </label>
        <input required id="password" name="password" type="password" value={inputs.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" onSubmit={handleSubmit} className="login__link">Log in</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ready to begin your journey?</p>
        <Link to="/register" className="signup__link">Sign up</Link>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default Login;