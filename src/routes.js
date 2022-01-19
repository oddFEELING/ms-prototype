import React from 'react';

// dahsboard
const Dashboard = React.lazy(() => import('./pages/dashboard'));
const Profile = React.lazy(() => import('./pages/profile'));
const Report = React.lazy(() => import('./pages/report'));

const routes = [
  { path: 'home', name: 'Dashboard', component: Dashboard },
  { path: 'profile', name: 'Profile', component: Profile },
  { path: 'report', name: 'Report', component: Report },
];

export default routes;
