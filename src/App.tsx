import React from 'react';

// import 'antd/dist/antd.css';
import './App.scss';

import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Signin from './pages/Auth/Signin/Signin.component';
import Signup from './pages/Auth/Signup/Signup.component';

import { isRoutePublic, routes } from './navigation/routes';
import { jwt } from './api/jwt';

import Layout from './components/Layout';
import LayoutProvider from './components/Layout/LayoutProvider';
import Profile from './pages/Profile';
import { UserInfoContextProvider } from './contexts/userInfo/userInfoContext';
import BusinessCards from './pages/BusinessCards';
import ModifyBusinessCard from './pages/ModifyBusinessCard';
import BusinessCardPublicPage from './pages/BusinessCardPublicPage';
import Settings from './pages/Settings';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isRouteAccessible = !jwt.isExpired() || isRoutePublic();

  return isRouteAccessible ? <>{children}</> : <Navigate to={routes.signin()._} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <UserInfoContextProvider>
        <LayoutProvider>
          <Routes>
            <Route path={routes.signin()._} element={<Signin />} />
            <Route path={routes.signup()._} element={<Signup />} />

            <Route
              path={routes.profile()._}
              element={
                <Layout>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Layout>
              }
            >
              {/* <Route path={routes.profile(':tab')._} element={null} /> */}
            </Route>

            <Route
              path={routes.businessCards()._}
              element={
                <Layout>
                  <ProtectedRoute>
                    <BusinessCards />
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path={routes.businessCards('connections')._}
              element={
                <Layout>
                  <ProtectedRoute>
                    <BusinessCards />
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path={routes.businessCards(':id')._}
              element={
                <Layout>
                  <BusinessCardPublicPage />
                </Layout>
              }
            />

            <Route
              path={routes.businessCards().edit(':id')._}
              element={
                <Layout>
                  <ProtectedRoute>
                    <ModifyBusinessCard />
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path={routes.settings()._}
              element={
                <Layout>
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                </Layout>
              }
            >
              <Route path={routes.settings(':tab')._} element={null} />
            </Route>

            <Route
              path="*"
              element={<Navigate to={jwt.isExpired() ? routes.signin()._ : routes.businessCards()._} replace />}
            />
          </Routes>
        </LayoutProvider>
      </UserInfoContextProvider>
    </BrowserRouter>
  );
}

export default App;
