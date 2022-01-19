// Global context reducer

export default function reducer(state, action) {
  switch (action.type) {
    //   toggle sidebar state
    case 'toggle__sideBar':
      return (state = {
        ...state,
        sideBar: {
          open: !state.sideBar.open,
        },
      });

    // set current page
    case 'set_current_page':
      return (state = {
        ...state,
        currentPage: action.payload,
      });

    // set user list
    case 'set_user_list':
      return (state = {
        ...state,
        users: action.payload,
      });

    // set project list
    case 'set_projects':
      return (state = {
        ...state,
        projects: action.payload,
      });

    // set current user
    case 'set_cur_user':
      return (state = {
        ...state,
        currentUser: action.payload,
      });

    // set map center
    case 'set_center':
      return (state = {
        ...state,
        map: {
          ...state.map,
          center: action.payload,
        },
      });
    default:
      return state;
  }
}
