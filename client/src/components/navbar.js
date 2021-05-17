import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import logo from "../images/logo.png"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export const Topbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
        window.location.replace("/");
    }
    const gotocart = () => {
      window.location.replace("/cart")
    }
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"><img src={logo} width="64px" alt="src"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
          <Button variant="outline-success">Search</Button>
        </Form>
          {auth.isAuthenticated && <Nav.Link href="#home">{auth.userName}</Nav.Link>}
          <Button onClick={gotocart} variant="link">Корзина</Button>
          {!auth.isAuthenticated && <Nav.Link href="/login">Войти</Nav.Link>}
          {auth.isAuthenticated && <Button onClick={logoutHandler} variant="link">Выйти</Button>}
      </Navbar.Collapse>
      </Navbar>
    )
}