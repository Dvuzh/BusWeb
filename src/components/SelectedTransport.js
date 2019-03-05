import {Component} from "react";
import React from "react";
import {Link, BrowserRouter, Route} from "react-router-dom";
import App from "../App";
import Map from "./Map";

class SelectedTransport extends Component {
    constructor(props) {
        super(props);

        this.state = {car: {num: 1, directionOne: 5, directionTwo: 2, id: 1, type: 0}};
    }

    componentWillMount() {
        console.log(this.props.params)
        // let card = this.props.transports.find((transport)=>transport.id == this.props.params.transportId);
        // this.setState({...card});
    }


    render() {
        const currentCar = this.state.car;
        return (
            <BrowserRouter>
                <div className="selected-transport">
                    <section>
                        <div className="container">
                            <div className="titlebar left">
                                  <span
                                      className="red-title">{currentCar.type === 0 ? 'Автобус ' : currentCar.type === 1 ? 'Трамвай ' : 'Троллейбус '}
                                      № {currentCar.num}</span>
                                <br/>
                                <span> Всего на маршруте : </span>
                                <span
                                    className="red-title">{currentCar.directionOne + currentCar.directionTwo} ед.</span>
                            </div>
                            <div className="titlebar rigth">
                                <ul className="list-transport">
                                    <li>
                                        <Link to={"/"} replace> Главная </Link>
                                    </li>
                                    <li>
                                        <Link to="/"> Остановки </Link>
                                    </li>
                                    <li>
                                        <Link to={"/map"} replace> На карте </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </section>

                    <Route exact path="/" component={App}/>
                    <Route path="/map" component={Map}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default SelectedTransport;