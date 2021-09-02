import React, {useLayoutEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css';

import GetName from "./ui/components/UI/GetName";
import theme from './ui/field.png'
import Lobby from "./ui/components/UI/Lobby";
import {SearchGame} from "./ui/components/UI/SearchGame";
import Game from "./ui/components/UI/Game";

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function App(){

    const [width, height] = useWindowSize();

    return (
            <Router>
                <div className="theme">
                    <img alt={''} src={theme} style={{width: width, height: height}}/>
                </div>

                <Switch>
                    <Route exact path={'/'} component={GetName}/>
                    <Route path={'/lobby'} component={Lobby}/>
                    <Route path={'/game'} component={Game}/>
                    <Route path={'/search'} component={SearchGame}/>
                </Switch>
                <GetName />
            </Router>
        );
}

export default App;