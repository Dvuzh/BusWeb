import React, {PureComponent} from "react";

import {Link, Route, NavLink, withRouter} from "react-router-dom";

import MapY from "./MapY";
import StationTransport from "./StationTransport";

class SelectedTransport extends PureComponent {
    // state = {car: {num: 1, directionOne: 5, directionTwo: 2, id: 1, type: 0}};

    constructor(props){
        super(props);
        this.state = {
            car : {num: 1, directionOne: 5, directionTwo: 2, id: this.props.match.params.transportId, type: 0}
        }
    }

    render() {
        const {car} = this.state;
        // car.id = 8;

        return (
            <div className="selected-transport">
                <section>
                    <div className="container">
                        <div className="titlebar">
                                  <span
                                      className="red-title">{car.type === 0 ? 'Автобус ' : car.type === 1 ? 'Трамвай ' : 'Троллейбус '}
                                      № {car.num}</span>
                            <br/>
                            <span> Всего на маршруте : </span>
                            <span
                                className="red-title">{car.directionOne + car.directionTwo} ед.</span>
                        </div>
                        <div className="titlebar">
                            <ul className="list-transport">
                                <Link to={"/"}> Главная </Link>
                                <NavLink to={`/route/${car.id}/station`}> Остановки </NavLink>
                                <NavLink exact to={`/route/${car.id}/map`}> На карте </NavLink>
                            </ul>
                        </div>
                    </div>
                </section>


                <Route path="/route/:transportId/station" component={StationTransport}/>
                <Route path="/route/:transportId/map" component={MapY}/>
            </div>
        );
    }
}

export default withRouter(SelectedTransport);