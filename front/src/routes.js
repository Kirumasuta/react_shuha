import React , {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {SearchGame} from "./ui/components/UI/SearchGame";
import {HostGame} from "./ui/components/UI/HostGame";
import GetName from './ui/components/UI/GetName';
import Lobby from "./ui/components/UI/Lobby";



export const useRoutes = isNamed => {
    if (isNamed) {
        return (
            <Route path="/lobby">
                <Lobby />
            </Route>
        )
    }

    return (
        <Switch>
            <Route path="/getname" exact>
                <GetName />
            </Route>
            <Redirect to="/getname" />
        </Switch>
    )
}