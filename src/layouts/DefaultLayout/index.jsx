import React from 'react';
import SideBar from '../../components/sideBar';
import ContentLayout from '../ContentLayout';
import styles from './style.module.scss';

const DefaultLayout = () => {
  return (
    <div className={styles.container}>
      {/* ----- SideBar ----- */}
      <SideBar />

      {/* ----- content ----- */}
      <ContentLayout />
    </div>
  );
};

export default DefaultLayout;
