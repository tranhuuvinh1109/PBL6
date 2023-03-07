
import './App.css';
import React, { createContext, useState } from 'react';
import HomePage from './Home/HomePage';
import Login from './Auth/LoginPage/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRouter } from './Router/PrivateRouter';
import AppContent from './AppLayout/Content/Content';
import { adminRouter, routers } from './Router';
import NotFound from './Page/NotFound/NotFound';
import AdminContent from './Admin/AdminContent';
import CoureDetail from './Page/CourseDetail/CourseDetail';
import { Toaster } from 'react-hot-toast';


export const AppContext = createContext({});

function App () {
  // const user = {
  //   id: 1,
  //   name: 'Vinh',
  //   avatar: 'https://image.sggp.org.vn/w800/Uploaded/2023/dqmbbcvo/2022_06_29/tonikroos_ITYP.jpg'
  // }
  const [user, setUser] = useState();

  return (
    <AppContext.Provider value={ { user, setUser } } >
      <div className="App">
        <Toaster
          position="top-center"
          reverseOrder={ false } />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='page' element={ <PrivateRouter path='/login' outlet={ <AppContent /> } /> } >
              {
                routers.map(route => {
                  return <Route key={ route.path } element={ <route.component /> } path={ route.path } />
                })
              }
              <Route path='course/:id' element={ <CoureDetail /> } />
              <Route path='*' element={ <NotFound /> } />
            </Route>
            <Route path='admin' element={ <PrivateRouter path='/login' outlet={ <AdminContent /> } /> } >
              {
                adminRouter.map(route => {
                  return <Route key={ route.path } element={ <route.component /> } path={ route.path } />
                })
              }
              <Route path='*' element={ <NotFound /> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>

  );
}

export default App;
