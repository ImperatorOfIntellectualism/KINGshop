import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage';
import { ItemPage } from './pages/ItemPage';
import {MainPage} from './pages/MainPage'
import {RegisterPage} from './pages/RegisterPage'
import {CartPage} from './pages/CartPage'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/cart">
                    <CartPage />
                </Route>
                <Route path="/item">
                    <ItemPage/>
                </Route>
                <Route path="/">
                    <MainPage/>
                </Route>
            </Switch>
        )
    }
    else return (
        <Switch>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Route path="/login">
                <AuthPage/>
            </Route>
            <Route path="/register">
                <RegisterPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}