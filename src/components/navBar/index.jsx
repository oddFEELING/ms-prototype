import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import DashIcon from '../../assets/icons/dahboard-icon.svg';
import GlobalContext from '../../contexts/AppContext/Context';

const NavBar = () => {
  const { actions, globalState } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleIconClick(prop) {
    navigate(prop, { replace: true });
    actions.setPage(prop);
  }

  return (
    <div className={styles.container}>
      {/* ----- page title ----- */}
      <h3>{globalState.currentPage}</h3>

      {/* ----- other nav content ----- */}
      <div className={styles.content__area}>
        <button>Reset map</button>

        {/* dash icon */}
        <img src={DashIcon} alt='' onClick={() => handleIconClick('Home')} />

        {/* home icon */}
        <img
          src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          alt=''
          onClick={() => handleIconClick('Profile')}
        />
      </div>
    </div>
  );
};

export default NavBar;
