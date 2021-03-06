import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import About from '../route1/About';
import Topic from '../route1/Topic';

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route path="/main" render={() =>
                        <Main>
                            <Route path="/main/a" component={About}></Route>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                </Home>
            </Router>
        );
    }
};
