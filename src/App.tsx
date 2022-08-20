import React from 'react';

import 'antd/dist/antd.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signin from './pages/Signin/Signin.component';
import Signup from './pages/Signup/Signup.component';
import { ROUTES } from './navigation/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          // element={<App />}
        >
          {/* <Route index element={<Home />} /> */}
          <Route path={ROUTES.AUTH.SIGNIN} element={<Signin />} />
          <Route path={ROUTES.AUTH.SIGNUP} element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
