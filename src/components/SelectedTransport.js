import React, {Component} from "react";

import {Link, Route, NavLink, withRouter} from "react-router-dom";

import MapY from "./MapY";
import StationTransport from "./StationTransport";

class SelectedTransport extends Component {
    constructor(props){
        super(props);
        this.state = {
            car : {},
        };
        let timerId = 0;
    }

    componentDidMount() {
        fetch(`/transports/${this.props.match.params.transportId}`,{ method: 'POST'})
            .then(result => result.json())
            .then(car => this.setState(car));

        this.getPosition();
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    };

    getPosition() {

        fetch(`/transports/position/${this.props.match.params.transportId}`)
            .then(result => result.json())
            .then(results => {
                // const countAll = results.count.reduce((sum, current) => parseInt(sum) + parseInt(current));

                let {car} = this.state;
                car.directionOne = results.count[0];
                car.directionTwo = results.count[1];

                this.setState({car});


                this.timerId = setTimeout(() => {
                    this.getPosition()
                }, 15000);
            });
    }

    render() {
        const {car} = this.state;

        return (
            <div className="selected-transport">
                <section>
                    <div className="container header">
                        <div className="titlebar">
                                  <span
                                      className="red-title">{car.type === 0 ? 'Автобус ' : car.type === 1 ? 'Трамвай ' : 'Троллейбус '}
                                      № {car.num}</span>
                            <br/>
                            <span> Всего на маршруте : </span>
                            <span
                                className="red-title">{ parseInt(car.directionOne) + parseInt(car.directionTwo)} ед.</span>
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


                <Route path="/route/:transportId/station" component={StationTransport} car={car}/>
                <Route path="/route/:transportId/map" component={MapY} isMap={1} />
            </div>
        );
    }
}

export default withRouter(SelectedTransport);