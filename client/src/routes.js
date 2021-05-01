import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import {MainPage} from './pages/MainPage'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/create">
                    <CreatePage/>
                </Route>
                <Route path="/main">
                    <MainPage/>
                </Route>
                <Redirect to="/main" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}