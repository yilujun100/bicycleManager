import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './../App';
import Login from '../pages/login';
import Admin from './../admin';
import Buttons from './../pages/ui/buttons';
import Modals from './../pages/ui/modals';
import Loadings from './../pages/ui/loadings';
import Notice from './../pages/ui/notice';
import Messages from './../pages/ui/messages';
import Tabs from './../pages/ui/tabs';
import Gallery from './../pages/ui/gallery';
import Carousel from './../pages/ui/carousel';
import FormLogin from './../pages/form/login';
import FormRegister from './../pages/form/register';
import NoMatch from './../pages/nomatch';
import Home from './../pages/home';
import BasicTable from './../pages/table/basicTable';
import HighTable from './../pages/table/highTable';
import City from './../pages/city';

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
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notice} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/ui/carousel" component={Carousel} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={FormRegister} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/city" component={City} />
                                    <Route component={NoMatch} />
                                    <Redirect to="/home" />
                                </Switch>
                            </Admin>
                        )}
                    ></Route>
                    <Route path="/order/detail" component={Login} />
                </App>
            </Router>
        );
    }
}
