import React, {PureComponent} from "react";
// import {render} from 'react-dom';
import './App.css';

import MapY from "./components/MapY";
import FilterTransports from "./components/FilterTransports";
import Transports from "./components/Transports";
import ScrollUpButton from "react-scroll-up-button";

function Header() {
    return (
        <section>
            <div className="header">
                <div className="inner-content">
                    <div className="counter-title">
                        <span> 286</span>
                        <p> На маршрутах</p>
                    </div>
                </div>
                <div className="inner-content">
                    <div className="counter-title">
                        <span> -13 °С</span>
                        <p> На улице</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

class App extends PureComponent {
    state = {filter: -1, isMapVisible: false};

    updateData = (value) => {
        this.setState({filter: value});
    };

    render() {
        return (
            <div className="App">
                <ScrollUpButton
                    StopPosition={0}
                    ShowAtPosition={10}
                    EasingType='easeInOutExpo'
                    ContainerClassName='scrollup-btn'
                    TransitionClassName='scrollup-btn__toggled'
                />
                <Header/>
                <section>
                    <div className="container">
                        <button type="button" className="btn-map"
                                onClick={() => this.setState({isMapVisible: !this.state.isMapVisible})}> Карта
                        </button>
                        {this.state.isMapVisible && <MapY/>}
                    </div>
                </section>
                <FilterTransports updateData={this.updateData}/>
                <Transports filter={this.state.filter}/>

            </div>
        );
    }
}

export default App;
