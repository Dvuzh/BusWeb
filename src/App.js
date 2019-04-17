import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React, {PureComponent} from "react";
import MainPage from "./components/MainPage";
import SelectedTransport from "./components/SelectedTransport";

class App extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/routes/:transportId" component={SelectedTransport}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
