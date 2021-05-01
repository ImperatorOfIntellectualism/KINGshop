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
    }
    return (
        <nav>
          <div className="nav-wrapper grey lighten-5">
            <a href="/"><img src={logo} alt="src"/></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink className="grey lighten-1" to="/create">Cоздать</NavLink></li>
              <li ><a href="/" className="grey lighten-1" onClick={logoutHandler}>Выход</a></li>
            </ul>
          </div>
        </nav>
    )
}