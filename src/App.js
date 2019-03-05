import React, {Component} from 'react';
// import {render} from 'react-dom';
import './App.css';
import Header from "./components/Header";
import Map from "./components/Map";
import FilterTransports from "./components/FilterTransports";
import Transports from "./components/Transports";



class App extends Component {
    state = { filter: -1 };

    updateData = (value) => {
        this.setState({ filter: value })
    };

    render() {
        return (
            <div className="App">
                <Header />
                <Map />
                <FilterTransports updateData={this.updateData} />
                <Transports filter={ this.state.filter} />
            </div>
        );
    }
}


export default App;
