import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../contexts/AppContext/Context.js';
import styles from './style.module.scss';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const { actions } = useContext(GlobalContext);
  // credentials state
  const [Credentials, setCredentials] = useState({
    name: '',
    password: '',
  });
  // const [User, setUser] = useState(false);

  // set credentials
  const setCred = (props) => (event) => {
    setCredentials({
      ...Credentials,
      [props]: event.target.value,
    });
  };

  const handleClick = () => {
    actions.setPage('Home');
    navigate('/dashboard/home');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Credentials.name.length < 3) return alert('Name too short');
    try {
      axios
        .get(`https://ms-proto.herokuapp.com/user/${Credentials.name}`)
        .then((res) => {
          actions.setUser(res.data);
          handleClick();
        })
        .catch((err) => alert('Failed to login'));
    } catch (err) {
      throw new Error('error');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.login__form}>
        <h1>Staff Sign in</h1>
        <input
          required
          type='text'
          placeholder='employee name'
          onChange={setCred('name')}
        />
        <input
          required
          type='password'
          placeholder='password...'
          onChange={setCred('password')}
        />
        <button onClick={handleSubmit}>Signin</button>
      </form>
    </div>
  );
};

export default SignIn;
