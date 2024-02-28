import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router";
import React from 'react';
import Login from "./login";
import { useEffect, useState } from "react";
export const MyContext = React.createContext();

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('user') !== null);

  useEffect(() => {
    const userLoggedInTimestamp = localStorage.getItem('userTime');
    if (userLoggedInTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - userLoggedInTimestamp >= 60 * 60 * 1000) {
        localStorage.removeItem('user');
        localStorage.removeItem('userTime');
        setUserLoggedIn(false);
      }
    }
  }, [userLoggedIn]);
  return (
    <Router>
      <div className="App" style={{position: 'relative'}}>
        <Routes>
          {publicRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout
              const type = route.props.type
              return (
               <Route key={index}
                    path={route.path}
                    element={
                      localStorage.getItem('user') !== null ? 
                        type === 'login' ?
                          <Page />
                          :
                          <MyContext.Provider value={type} >
                            <Layout >
                              <Page type={type}/>
                            </Layout>
                          </MyContext.Provider>
                        :
                        <Login/>
                    }
              />
              )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
