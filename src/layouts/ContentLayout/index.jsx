import React, { Suspense, useEffect, useContext } from 'react';
import styles from './style.module.scss';
import NavBar from '../../components/navBar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import GLobalContext from '../../contexts/AppContext/Context';
import HandLoader from '../../assets/animations/HandLoader';

const ContentLayout = () => {
  // get app context
  const { actions } = useContext(GLobalContext);

  // get all Users
  useEffect(() => {
    (async function () {
      try {
        const UserList = await axios.get('https://ms-proto.herokuapp.com/user');
        console.log(UserList.data);
        actions.setUserList(UserList.data);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  // get all projects
  useEffect(() => {
    (async function () {
      try {
        const UserList = await axios
          .get('https://ms-proto.herokuapp.com/asset/')
          .then((res) => actions.setProject(res.data));
        console.log(UserList.data);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      {/* ----- navbar ----- */}
      <NavBar />

      {/* ----- Dash content ----- */}
      <Suspense fallback={<HandLoader />}>
        <Outlet />
      </Suspense>

      {/* ----- footer ----- */}
    </div>
  );
};

export default ContentLayout;
