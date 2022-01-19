import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Ms-Prototype</h1>
      <Link to='/signin'>
        <button>Start App</button>
      </Link>
    </div>
  );
};

export default Home;
