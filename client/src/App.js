import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import { Navbar } from './components/navbar';

function App() {
  const {token, login, logout, userId, userName} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
  <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated, userName}}>
  <Router>
    <Navbar/>
      {routes}
  </Router>
  </AuthContext.Provider>);
}

export default App;