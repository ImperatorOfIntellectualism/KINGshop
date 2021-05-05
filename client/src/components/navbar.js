import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import logo from "../images/logo.png"

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }//<a href="/"><img src={logo} alt="src"/></a>
    return (
        <nav>
          <div className="nav-wrapper grey lighten-5">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {auth.isAuthenticated && <li><a href="/" className="grey lighten-1">{auth.userName}</a></li>}
              <li><NavLink className="grey lighten-1" to="/create">Cоздать</NavLink></li>
              {!auth.isAuthenticated &&<li><NavLink className="grey lighten-1" to="/login">Войти</NavLink></li>}
              {auth.isAuthenticated && <li><a href="/" className="grey lighten-1" onClick={logoutHandler}>Выход</a></li>}
            </ul>
          </div>
        </nav>
    )
}