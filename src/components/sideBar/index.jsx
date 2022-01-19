import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Logo from '../../assets/icons/logo_icon.png';
import Home from '../../assets/icons/home.png';
import HomeDark from '../../assets/icons/home_dk.png';
import Profile from '../../assets/icons/profile.png';
import ProfileDark from '../../assets/icons/profile_dk.png';
import Report from '../../assets/icons/report.png';
import ReportDark from '../../assets/icons/report_dk.png';
import LogoutIcon from '../../assets/icons/logout.png';
import GLobalContext from '../../contexts/AppContext/Context';

const SideBar = () => {
  const { actions, globalState } = useContext(GLobalContext);
  const navigate = useNavigate();

  const sideBarItems = [
    {
      icon: globalState.currentPage === 'Home' ? HomeDark : Home,
      name: 'Home',
      link: 'home',
    },
    {
      icon: globalState.currentPage === 'Profile' ? ProfileDark : Profile,
      name: 'Profile',
      link: 'profile',
    },
    {
      icon: globalState.currentPage === 'Report' ? ReportDark : Report,
      name: 'Report',
      link: 'Report',
    },
    {
      icon: LogoutIcon,
      name: 'Logout',
      link: '/signin',
    },
  ];

  const handleNav = (payload) => {
    actions.setPage(payload.name);
    if (payload.name === 'Logout') actions.setUser(false);
    navigate(payload.link.toLowerCase(), { replace: true });
  };

  return (
    <div className={styles.container}>
      {/* ----- App title ----- */}
      <section className={styles.sidebar__header}>
        <img src={Logo} alt='' />
        <h3>MS-Prototype</h3>
      </section>

      {/* ----- nave items ----- */}
      <section className={styles.nav__section}>
        {sideBarItems.map((item, index) => {
          return (
            <section
              key={index}
              className={styles.nav__item}
              honk={globalState.currentPage === item.name ? 'true' : ''}
              onClick={() => handleNav({ name: item.name, link: item.link })}
            >
              {/* ----- icon ----- */}
              <img src={item.icon} alt={item.name} />

              {/* ----- name ----- */}
              <h4>{item.name}</h4>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default SideBar;
