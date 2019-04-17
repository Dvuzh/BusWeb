import React, {Component} from "react";

import {Link, Route, NavLink, withRouter} from "react-router-dom";

import Maps from "./maps/Maps";
import StationTransport from "./StationTransport";
import {connect} from "react-redux";
import axios from "axios";

class SelectedTransport extends Component {

    state = {
        car: {}
    };

    componentDidMount() {
        axios.post(`/transports/${this.props.match.params.transportId}`)
            .then(res => res.data)
            .then(car => {
                this.setState(car);
                this.props.onAddTransport(car.car);
            });

        axios.get(`/transports/get-stations/${this.props.match.params.transportId}`)
            .then(res => res.data)
            .then(result => {
                this.props.onAddStations(result);
            });

        this.getPosition();
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    };

    getPosition() {
        axios.get(`/transports/position/${this.props.match.params.transportId}`)
            .then(result => result.data)
            .then(results => {
                let {car} = this.state;
                if (parseInt(results.count[0]) !== car.directionOne || parseInt(results.count[1]) !== car.directionTwo) {
                    car.directionOne = parseInt(results.count[0]);
                    car.directionTwo = parseInt(results.count[1]);
                    this.setState({car});
                    this.props.onAddTransport(car);
                }
                this.props.onAddRoutes(results.position);

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
                                      className="red-title">{car.type === 0 ? 'Bus ' : car.type === 1 ? 'Tram ' : 'Trolley '}
                                      # {car.num}</span>
                            <br/>
                            <span> Total Number: </span>
                            <span
                                className="red-title">{parseInt(car.directionOne) + parseInt(car.directionTwo)} </span>
                        </div>
                        <div className="titlebar">
                            <ul className="list-transport">
                                <Link to={"/"}> Home </Link>
                                <NavLink to={`/routes/${car.id}/stations`}> Stops </NavLink>
                                <NavLink exact to={`/routes/${car.id}/map`}> Map </NavLink>
                            </ul>
                        </div>
                    </div>
                </section>


                <Route path="/routes/:transportId/stations" component={StationTransport}/>
                <Route path="/routes/:transportId/map" component={Maps} isMap={1}/>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        // transport => addTransport(transport),
        onAddTransport: transport => dispatch({type: 'ADD_TRANSPORT', transport}),//transport => dispatch({type: 'ADD_TRANSPORT', transport}),// transport => addTransport(transport) //transport => dispatch({type: 'ADD_TRANSPORT', transport}),
        onAddStations: stations => dispatch({type: 'ADD_STATIONS', stations}),
        onAddRoutes: routes => dispatch({type: 'ADD_ROUTES', routes}),
    })
)(withRouter(SelectedTransport));