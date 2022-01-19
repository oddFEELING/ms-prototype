import React, { useReducer } from 'react';
import GlobalContext from './Context';
import reducer from './reducer';

const ContextComponent = ({ children }) => {
  // Initial value
  const initValue = {
    sideBar: {
      open: false,
    },
    currentPage: 'Home',
    currentUser: false,
    users: false,
    projects: false,
    map: {
      center: [0, 0],
      zoom: 3,
    },
  };

  //--------------------------------------->  Main reducer
  const [state, dispatch] = useReducer(reducer, initValue);

  // toggle side bar
  const toggleSideBar = () => {
    dispatch({
      type: 'toggle__sideBar',
    });
  };

  // set current page
  const setPage = (payload) => {
    dispatch({
      type: 'set_current_page',
      payload,
    });
  };

  // set users list
  const setUserList = (payload) => {
    dispatch({
      type: 'set_user_list',
      payload,
    });
  };

  // set project list
  const setProject = (payload) => {
    dispatch({
      type: 'set_projects',
      payload,
    });
  };

  // set current user
  const setUser = (payload) => {
    dispatch({
      type: 'set_cur_user',
      payload,
    });
  };

  // set center of map
  const setMapCenter = (payload) => {
    dispatch({
      type: 'set_center',
      payload,
    });
  };
  //--------------------------------------->  create actions object
  const actions = {
    toggleSideBar,
    setPage,
    setUserList,
    setProject,
    setUser,
    setMapCenter,
  };

  return (
    <GlobalContext.Provider value={{ globalState: state, actions }}>
      {''}
      {{ ...children }}
    </GlobalContext.Provider>
  );
};

export default ContextComponent;
