import React, {PureComponent} from "react";
import '../App.css';
import Maps from "./maps/Maps";
import FilterTransports from "./FilterTransports";
import Transports from "./Transports";
import ScrollUpButton from "react-scroll-up-button";
import axios from "axios";

function Header(props) {
    return (
        <section>
            <div className="header">
                <div className="inner-content">
                    <div className="counter-title">
                        <span> {props.amountTransposrt}</span>
                        <p> Total Buses</p>
                    </div>
                </div>
                <div className="inner-content">
                    <div className="counter-title">
                        <span> {props.temperature} °С</span>
                        <p> Temperature</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

class MainPage extends PureComponent {

    state = {filter: -1, isMapVisible: false, amountTransposrt: 0, temperature: 0};

    updateData = (value) => {
        this.setState({filter: value});
    };
    updateCountAll = (value) => {
        this.setState({amountTransposrt: value})
    };

    componentDidMount() {

        axios.get('/transports/amount')
            .then(res => res.data)
            .then(amountTransposrt => this.setState(amountTransposrt));

        axios.get('/weather/search-location-weather')
            .then(res => res.data)
            .then((temperature) => {
                this.setState({temperature: temperature.temperature.main.temp})
            });
    }


    handleClick = isMapVisible => {
        this.setState({isMapVisible: isMapVisible})
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
                <Header amountTransposrt={this.state.amountTransposrt} temperature={this.state.temperature}/>
                <section>
                    <div className="container">
                        <button type="button" className="btn-map"
                                onClick={() => this.handleClick(!this.state.isMapVisible)}> I'm Here
                        </button>
                        {this.state.isMapVisible && <Maps/>}
                    </div>
                </section>
                <FilterTransports updateData={this.updateData}/>
                <Transports filter={this.state.filter} updateCountAll={this.updateCountAll}/>
            </div>
        );
    }
}

export default MainPage;