import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SelectedTransport from "./components/SelectedTransport";
import axios from "axios";

import { createStore } from 'redux';
import { Provider } from 'react-redux';


import reducer from './store/reducers';
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/route/:transportId" component={SelectedTransport}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

