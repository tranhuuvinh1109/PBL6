
import './App.css';
import React, { createContext, useEffect, useState, useCallback } from 'react';
import HomePage from './Home/HomePage';
import Login from './Auth/LoginPage/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PrivateRouter } from './Router/PrivateRouter';
import AppContent from './AppLayout/Content/Content';
import { adminRouter, routers, privateRouter } from './Router';
import NotFound from './Page/NotFound/NotFound';
import AdminContent from './Admin/AdminContent';
import { Toaster, toast } from 'react-hot-toast';
import { authAPI } from './api/authApi';
import { courseAPI } from './api/courseAPI';
import Register from './Auth/RegisterPage/Register';
// import { categoryAPI } from './api/categoryApi';
import axios from 'axios';

// const apiURL = process.env.REACT_APP_API_URL;



export const AppContext = createContext({});

function App () {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [listCourse, setListCourse] = useState([]);
  // const [listCategory, setListCategory] = useState([]);
  const [user, setUser] = useState();

  const getListCourse = async () => {
    const res = await courseAPI.getCourse();
    if (res.status === 200) {
      setListCourse(res.data);
    } else {
      toast.error('Get Course Error');
      setListCourse([]);
    }
  }


  const fetchData = useCallback(async (token) => {
    setIsLoading(true);
    try {
      const [courseResponse, userResponse] = await axios.all([
        courseAPI.getCourse(),
        authAPI.getUserByToken(token)
      ]);

      const userData = userResponse.data;
      const courseData = courseResponse.data;

      if (userData) {
        if (userData.role === 0) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        console.log('me', userData)
        setUser(userData);
      }
      if (courseData) {
        setListCourse(courseData);
      }
      navigate('/');
    } catch (error) {
      toast.error(`Please login again`);
      navigate('/login');
      throw error;
    }
    finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('userID');
    if (token) {
      fetchData({ access_token: token });
    }
    getListCourse();
  }, [fetchData]);


  return (
    <AppContext.Provider value={{ user, setUser, listCourse, setListCourse, isLoading, setIsLoading, isAdmin, setIsAdmin }} >
      <div className="App">
        {/* <ScrollToTop smooth color="#6f00ff" /> */}
        <Toaster
          position="top-center"
          reverseOrder={false} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/" element={<AppContent />}>
            {routers.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/" element={<PrivateRouter outlet={<AppContent />} path='/login' />}>
            {privateRouter.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path='admin' element={<PrivateRouter path='/login' outlet={<AdminContent />} />} >
            {/* <Route path='admin' element={<AdminContent />} > */}
            {
              adminRouter.map(route => {
                return <Route key={route.path} element={<route.component />} path={route.path} />
              })
            }
            <Route path='*' element={<NotFound />} />
          </Route>

        </Routes>
      </div>
    </AppContext.Provider>

  );
}

export default App;
