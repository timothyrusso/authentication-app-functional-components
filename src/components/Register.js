import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';
import * as data from '../data.js';
import './styles/Register.css';

const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    calGoal: ''
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

  const handleChangeCals = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, email, calGoal } = inputs;
    if (password === confirmPassword) {
      auth.register(username, password, email, calGoal).then((res) => {
        if (res) {
          console.log('res OK');
          history.push('/login');
        } else {
          console.log('Something went wrong.');
          setMessage("Something went wrong, please try again.")
        }
      });
    }
  }

  return (
    <div className="register">
      <p className="register__welcome">
        Please register.
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">
          Username:
        </label>
        <input id="username" name="username" type="text" value={inputs.username} onChange={handleChange} />
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" value={inputs.email} onChange={handleChange} />
        <label htmlFor="password">
          Password:
        </label>
        <input id="password" name="password" type="password" value={inputs.password} onChange={handleChange} />
        <label htmlFor="confirmPassword">
          Confirm password:
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={inputs.confirmPassword} onChange={handleChange} />
        <label htmlFor="calGoal">
          Daily calorie goal:
        </label>
        <select name="calGoal" value={inputs.calGoal} onChange={handleChangeCals}>
          {
            data.calData.map((item, i) => {
              return (
                <option value={item.id} key={i}>{item.calGoal}</option>
              )
            })
          }
        </select>
        <div className="register__button-container">
          <button type="submit" onSubmit={handleSubmit} className="register__link">Sign up</button>
        </div>
        <p>{message}</p>
      </form>

      <div className="register__signin">
        <p>Already have an account??</p>
        <Link to="login" className="register__login-link">Log in here</Link>
      </div>
    </div>
  );
}

export default Register;