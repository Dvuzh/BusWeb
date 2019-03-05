import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import SelectedTransport from "./components/SelectedTransport";

ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render((
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={App} />
                <Route path="/route" component={SelectedTransport} />
            </Switch>
        </div>
    </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
