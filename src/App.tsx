import React from 'react';

import 'antd/dist/antd.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login.component';
import Signup from './pages/Signup/Signup.component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          // element={<App />}
        >
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
