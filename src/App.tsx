import React from 'react';

import 'antd/dist/antd.css';
import './App.scss';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Signin from './pages/Auth/Signin/Signin.component';
import Signup from './pages/Auth/Signup/Signup.component';
import { isRoutePublic, ROUTES } from './navigation/routes';
import { jwt } from './api/jwt';
import Layout from './components/Layout';
import LayoutProvider from './components/Layout/LayoutProvider';

function App() {
  if (jwt.isExpired() && !isRoutePublic()) {
    window.location.pathname = ROUTES.AUTH.SIGNIN;
    return null;
  }

  return (
    <BrowserRouter>
      <LayoutProvider>
        <Routes>
          <Route path={ROUTES.AUTH.SIGNIN} element={<Signin />} />
          <Route path={ROUTES.AUTH.SIGNUP} element={<Signup />} />

          <Route
            path={ROUTES.PROFILE}
            element={
              <Layout>
                <div>TODO: PROFILE</div>
              </Layout>
            }
          />

          <Route
            path={ROUTES.BUSINESS_CARDS}
            element={
              <Layout>
                <div>TODO: Business Cards</div>
              </Layout>
            }
          />

          <Route
            path={ROUTES.SETTINGS}
            element={
              <Layout>
                <div>TODO: Settings</div>
              </Layout>
            }
          />

          <Route
            path="*"
            element={<Navigate to={ROUTES.AUTH.SIGNIN} replace />}
          />
        </Routes>
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default App;
