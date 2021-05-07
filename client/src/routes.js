import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage';
import { ItemPage } from './pages/ItemPage';
import {MainPage} from './pages/MainPage'
import {RegisterPage} from './pages/RegisterPage'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/item">
                    <ItemPage/>
                </Route>
                <Route path="/">
                    <MainPage/>
                </Route>
            </Switch>
        )
    }
    return (
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