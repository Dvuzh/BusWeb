import React, {PureComponent} from "react";
// import {render} from 'react-dom';
import './App.css';

import MapY from "./components/MapY";
import FilterTransports from "./components/FilterTransports";
import Transports from "./components/Transports";
import ScrollUpButton from "react-scroll-up-button";

// alex: вынесла бы в отдельный файл, вообще бы реорганизовала бы компоненты по папкам.
// например heaher/Header.js 
// + добавила бы Header.styles.js где настроила бы стили взамен использования css-классов
function Header(props) {
    return (
        <section>
            <div className="header">
                <div className="inner-content">
                    <div className="counter-title">
                        <span> {props.amountTransposrt}</span>
                        <p> На маршрутах</p>
                    </div>
                </div>
                <div className="inner-content">
                    <div className="counter-title">
                        <span> {props.temperature} °С</span>
                        <p> На улице</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// alex: за PureComponent молодец ^_^
class App extends PureComponent {
    // alex: amountTransposrt: 0, temperature : 0 -- можно хранить в сторе
    state = {filter: -1, isMapVisible: false, amountTransposrt: 0, temperature : 0};

    updateData = (value) => {
        this.setState({filter: value});
    };
    updateCountAll =(value) =>{
        this.setState({amountTransposrt : value})
    };
    componentDidMount() {
        // в thunk. 
        fetch('/transports/amount')
            .then(res => res.json())
            .then(amountTransposrt => this.setState(amountTransposrt));

        // alex: вот такая штука говорит о том, что где-то что-то пошло не так...
        // temperature.temperature.main.temp, потому что компоненту должно быть фиолетово, 
        // как там другой сервис данные ему отправляет, ему надо тупо получить пропс,
        // если что, то это должно максимум в service обрабатыватся или в санке
        fetch('/weather/search-location-weather')
            .then(res => res.json())
            .then((temperature) => {this.setState( {temperature : temperature.temperature.main.temp})});
    }

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
                <Header amountTransposrt={this.state.amountTransposrt} temperature={ this.state.temperature}/>
                <section>
                    <div className="container">
                        <button type="button" className="btn-map"
                                /* alex: давай в метод класса?) handleClick */
                                onClick={() => this.setState({isMapVisible: !this.state.isMapVisible})}> Где я
                        </button>
                        {this.state.isMapVisible && <MapY />}
                    </div>
                </section>
                <FilterTransports updateData={this.updateData}/>
                <Transports filter={this.state.filter} updateCountAll={this.updateCountAll}/>

            </div>
        );
    }
}

export default App;
