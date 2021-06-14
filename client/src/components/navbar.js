import React, { useContext, useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import logo from "../images/logo.png"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {useHttp} from "../hooks/http.hook"
import {ItemContext} from '../context/item.context'
import { ItemPage } from '../pages/ItemPage';

export const Topbar = () => {
  const {request} = useHttp();
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
    async function check(){
      let name = document.getElementsByClassName("mr-sm-2")[0].value
      let items;
      if (name === "") {
        document.getElementById("display").innerHTML = null
      }
      else items = await request('/api/auth/handler', "POST", {name: name})
      if (items !== undefined){
      if (!!document.getElementById("display")){
        document.getElementById("display").innerHTML = items
      }
    }
    }
    let [chosen, setChosen] = useState(null);

    function getitem()  {
      setChosen(null)
      setChosen(chosen = document.getElementsByClassName('mr-sm-2')[0].value)
      console.log(chosen)
    }
    if (chosen == null) return (
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
        <div class="search">
        <Form inline>
          <FormControl type="text" placeholder="Search" onKeyUp={check} className="mr-sm-2"/>
          <Button onClick={getitem} variant="outline-success">Search</Button>
        </Form>
        <div id="display"></div>
        </div>
          {auth.isAuthenticated && <Nav.Link href="#home" id="username">{auth.userName}</Nav.Link>}
          {auth.isAuthenticated &&<Button onClick={gotocart} variant="link">Корзина</Button>}
          {!auth.isAuthenticated && <Nav.Link href="/login">Войти</Nav.Link>}
          {auth.isAuthenticated && <Button onClick={logoutHandler} variant="link">Выйти</Button>}
      </Navbar.Collapse>
      </Navbar>
    )
    else if (chosen != null) return (
      <div>
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
        <div class="search">
        <Form inline>
          <FormControl type="text" placeholder="Search" onKeyUp={check} className="mr-sm-2"/>
          <Button onClick={getitem} variant="outline-success">Search</Button>
        </Form>
        <div id="display"></div>
        </div>
          {auth.isAuthenticated && <Nav.Link href="#home" id="username">{auth.userName}</Nav.Link>}
          {auth.isAuthenticated &&<Button onClick={gotocart} variant="link">Корзина</Button>}
          {!auth.isAuthenticated && <Nav.Link href="/login">Войти</Nav.Link>}
          {auth.isAuthenticated && <Button onClick={logoutHandler} variant="link">Выйти</Button>}
      </Navbar.Collapse>
      </Navbar>
      <ItemContext.Provider value={{name: chosen}}>
      <ItemPage/>
      </ItemContext.Provider>
      </div>
    )
}