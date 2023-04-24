
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
// import ScrollToTop from "react-scroll-to-top";
import { Toaster, toast } from 'react-hot-toast';
import { authAPI } from './api/authApi';
import { courseAPI } from './api/courseAPI';
import Register from './Auth/RegisterPage/Register';
import { categoryAPI } from './api/categoryApi';


export const AppContext = createContext({});

function App () {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [listCourse, setListCourse] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [user, setUser] = useState();
  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('userID');
      if (token) {
        const res = await authAPI.getUserByToken({ access_token: token });
        if (res.status === 200) {
          setUser(res.data.data);
          if (res.data.data.role === 0) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          localStorage.setItem('userID', token);
        }
      }
      else {
        navigate('/login');
        throw new Error("Get user failed");
      }
    }
    catch {
      toast.error("Please login again");
      navigate('/login');
    }
    finally {
      setIsLoading(false);
    }
  }, []);
  const GetCourse = async () => {
    try {
      setIsLoading(true);
      const res = await courseAPI.getCourse();
      if (res.status === 200) {
        console.log(111, res.data);
        setListCourse(res.data);
      }
      else {
        throw new Error("Get Course failed");
      }
    }
    catch (err) {
      toast.error(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };
  const getCategory = async () => {
    try {
      setIsLoading(true);
      const res = await categoryAPI.getAll();
      if (res.status === 200) {
        setListCategory(res.data.data);
      }
      else {
        throw new Error("Get Category failed");
      }
    }
    catch (err) {
      toast.error(err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetCourse();
    getCategory();
    const token = localStorage.getItem('userID');
    if (token) {
      getUser();
    }
  }, [getUser]);


  return (
    <AppContext.Provider value={{ user, setUser, listCourse, setListCourse, isLoading, setIsLoading, listCategory, isAdmin, setIsAdmin }} >
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
