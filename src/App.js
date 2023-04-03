
import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import HomePage from './Home/HomePage';
import Login from './Auth/LoginPage/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRouter } from './Router/PrivateRouter';
import AppContent from './AppLayout/Content/Content';
import { adminRouter, routers } from './Router';
import NotFound from './Page/NotFound/NotFound';
import AdminContent from './Admin/AdminContent';
// import ScrollToTop from "react-scroll-to-top";
import { Toaster } from 'react-hot-toast';
import { authAPI } from './api/authApi';
import { courseAPI } from './api/courseAPI';


export const AppContext = createContext({});

function App () {
  const [listCourse, setListCourse] = useState([]);
  const [user, setUser] = useState();
  const getUser = async () => {
    const res = await authAPI.getUserByToken();
    if (res.status === 200) {

      setUser(res.data.data)
      localStorage.setItem('userID', res.data.refresh_token)
    }
  }
  const GetCourse = async () => {
    const res = await courseAPI.getCourse();
    if (res.status === 200) {
      setListCourse(res.data.data);
    }
  }
  useEffect(() => {
    GetCourse();
    const token = localStorage.getItem('userID');
    if (token) {
      getUser();
    }
  }, [])


  return (
    <AppContext.Provider value={{ user, setUser, listCourse, setListCourse }} >
      <div className="App">
        {/* <ScrollToTop smooth color="#6f00ff" /> */}
        <Toaster
          position="top-center"
          reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='page' element={<PrivateRouter path='/login' outlet={<AppContent />} />} >
              {
                routers.map(route => {
                  return <Route key={route.path} element={<route.component />} path={route.path} />
                })
              }
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='admin' element={<PrivateRouter path='/login' outlet={<AdminContent />} />} >
              {
                adminRouter.map(route => {
                  return <Route key={route.path} element={<route.component />} path={route.path} />
                })
              }
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>

  );
}

export default App;
