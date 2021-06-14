import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import { Topbar } from './components/navbar';

function App() {
  const {token, login, logout, userId, userName} = useAuth()
  const isAuthenticated = !!localStorage.getItem("userData")
  const routes = useRoutes(isAuthenticated)
  return (
  <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated, userName}}>
  <Router>
    <Topbar/>
      {routes}
  </Router>
  </AuthContext.Provider>);
}

export default App;