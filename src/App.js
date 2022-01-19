import React, { Suspense } from 'react';
import HandLoader from './assets/animations/HandLoader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

//  lazy imort pages
const Home = React.lazy(() => import('./pages/home'));
const Signin = React.lazy(() => import('./pages/signin'));
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<HandLoader height='100px' width='100px' />}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='dashboard' element={<DefaultLayout />}>
            {routes.map((route, index) => {
              return (
                route.component && (
                  <Route
                    path={route.path}
                    element={<route.component />}
                    key={index}
                  />
                )
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
