import React, {Component} from 'react';
import {render} from 'react-dom';
import './App.css';
import Header from "./components/Header";
import MapY from "./components/MapY";
import FilterTransports from "./components/FilterTransports";
import Transports from "./components/Transports";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SelectedTransport from "./components/SelectedTransport";


class App extends Component {
    state = {filter: -1};

    updateData = (value) => {
        this.setState({filter: value})
    };

    render() {
        const App = () => (
            <div className="App">
                <Header/>
                <section>
                    <div className="container">
                        <button type="button" className="btn-map" onClick={() => {return <MapY />;}}> Карта</button>
                    </div>
                </section>
                <FilterTransports updateData={this.updateData}/>
                <Transports filter={this.state.filter}/>
            </div>
        );
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/route/:transportId" component={SelectedTransport} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
