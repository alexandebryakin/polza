import React from 'react';

import 'antd/dist/antd.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Signin from './pages/Auth/Signin/Signin.component';
import Signup from './pages/Auth/Signup/Signup.component';
import { isRoutePublic, ROUTES } from './navigation/routes';
import { jwt } from './core/jwt';

function App() {
  React.useEffect(() => {
    if (jwt.isExpired() && !isRoutePublic()) {
      window.location.pathname = ROUTES.AUTH.SIGNIN;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          // element={<App />}
        >
          <Route path={ROUTES.AUTH.SIGNIN} element={<Signin />} />
          <Route path={ROUTES.AUTH.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.PROFILE} element={<div>TODO: PROFILE</div>} />
          <Route
            path="*"
            element={<Navigate to={ROUTES.AUTH.SIGNIN} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
