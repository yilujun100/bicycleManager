import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import App from './../App';
import Login from '../pages/login';
import Admin from './../admin';
import Buttons from './../pages/ui/buttons';
import NoMatch from './../pages/nomatch';
import Home from './../pages/home';

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route path="/login" component={Login} />
                    <Route
                        path="/"
                        render={() => (
                            <Admin>
                                <Route path="/home" component={Home} />
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route component={NoMatch} />
                                <Redirect to="/home" />
                            </Admin>
                        )}
                    ></Route>
                    <Route path="/order/detail" component={Login} />
                </App>
            </Router>
        );
    }
}
