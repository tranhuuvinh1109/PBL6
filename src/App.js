
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
import CoureDetail from './Page/CourseDetail/CourseDetail';
// import ScrollToTop from "react-scroll-to-top";
import { Toaster } from 'react-hot-toast';
import { authAPI } from './api/authApi';


export const AppContext = createContext({});

function App () {
  const [listCourse, setListCourse] = useState([]);
  const [user, setUser] = useState();
  const GetCourse = async () => {
    const res = await authAPI.getUser('/course')

    if (res.status === 200) {
      setListCourse(res.data);
    }
    return [];

  }
  useEffect(() => {
    GetCourse();
  }, [])


  return (
    <AppContext.Provider value={{ user, setUser, listCourse }} >
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
              <Route path='course/:id' element={<CoureDetail />} />
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
