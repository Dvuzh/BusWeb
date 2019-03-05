import {Component} from "react";
import React from "react";
import {Link, BrowserRouter, Route , NavLink} from "react-router-dom";

import MapY from "./MapY";
import StationTransport from "./StationTransport";

class SelectedTransport extends Component {
    constructor(props) {
        super(props);

        this.state = {car: {num: 1, directionOne: 5, directionTwo: 2, id: 1, type: 0}};
    }

    // componentWillMount() {
    //     console.log(this.props.params)
    //     // let card = this.props.transports.find((transport)=>transport.id == this.props.params.transportId);
    //     // this.setState({...card});
    // }


    render() {
        const currentCar = this.state.car;
        return (
            <BrowserRouter>
                <div className="selected-transport">
                    <section>
                        <div className="container">
                            <div className="titlebar">
                                  <span
                                      className="red-title">{currentCar.type === 0 ? 'Автобус ' : currentCar.type === 1 ? 'Трамвай ' : 'Троллейбус '}
                                      № {currentCar.num}</span>
                                <br/>
                                <span> Всего на маршруте : </span>
                                <span
                                    className="red-title">{currentCar.directionOne + currentCar.directionTwo} ед.</span>
                            </div>
                            <div className="titlebar">
                                <ul className="list-transport">
                                        <Link to={"/"} > Главная </Link>
                                        <NavLink activeClassName="active" exact to={`/route/${currentCar.id}/station/0`}> Остановки </NavLink>
                                        <NavLink activeClassName="active" exact to={`/route/${currentCar.id}/map`}> На карте </NavLink>

                                </ul>
                            </div>
                        </div>
                    </section>


                    <Route path="/route/:transportId/station/0" component={StationTransport}/>
                    <Route path="/route/:transportId/map" component={MapY}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default SelectedTransport;