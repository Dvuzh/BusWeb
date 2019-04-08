import React, {Component} from "react";

import {Link, Route, NavLink, withRouter} from "react-router-dom";

import MapY from "./MapY";
import StationTransport from "./StationTransport";
import {connect} from "react-redux";

// alex: PureComponent
class SelectedTransport extends Component {
    /* alex:
    state = {
        car: {}
    }
    */

    constructor(props) {
        super(props);
        this.state = {
            car: {},
        };
    }

    componentDidMount() {
        // alex: не здесь
        fetch(`/transports/${this.props.match.params.transportId}`, {method: 'POST'})
            .then(result => result.json())
            .then(car => {
                this.setState(car);
                this.AddTransport(car.car);
            });

        fetch(`/transports/get-stations/${this.props.match.params.transportId}`)
            .then(result => result.json())
            .then(result => {
                this.props.onAddStations(result);
            });

        this.getPosition();
    }

    AddTransport(car) {
        this.props.onAddTransport(car);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    };

    getPosition() {
        fetch(`/transports/position/${this.props.match.params.transportId}`)
            .then(result => result.json())
            .then(results => {
                let {car} = this.state;
                if (parseInt(results.count[0]) !== car.directionOne || parseInt(results.count[1]) !== car.directionTwo) {
                    car.directionOne = parseInt(results.count[0]);
                    car.directionTwo = parseInt(results.count[1]);
                    this.setState({car});
                    this.AddTransport(car);
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
                                      className="red-title">{car.type === 0 ? 'Автобус ' : car.type === 1 ? 'Трамвай ' : 'Троллейбус '}
                                      № {car.num}</span>
                            <br/>
                            <span> Всего на маршруте : </span>
                            <span
                                className="red-title">{parseInt(car.directionOne) + parseInt(car.directionTwo)} ед.</span>
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
                <Route path="/route/:transportId/map" component={MapY} isMap={1}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        // alex: а зачем тебе здесь эти данные из стора если в компоненте SelectedTransport ты их не используешь?
        transport: state.transport,
        stations: state.stations
    }),
    dispatch => ({
        onAddTransport: (transport) => {
            dispatch({type: 'ADD_TRANSPORT', transport: transport});
        },
        onAddStations: (stations) => {
            dispatch({type: 'ADD_STATIONS', stations: stations});
        },
        onAddRoutes: (routes) => {
            dispatch({type: 'ADD_ROUTES', routes: routes});
        }
    })
)(withRouter(SelectedTransport));

/* alex: some kind of magic
export default connect(
    state => ({
        transport: state.transport,
        stations: state.stations
    }),
    dispatch => ({
        onAddTransport: transport => dispatch({type: 'ADD_TRANSPORT', transport}),
        onAddStations: stations => dispatch({type: 'ADD_STATIONS', stations}),
        onAddRoutes: routes => dispatch({type: 'ADD_ROUTES', routes})
    })
)(withRouter(SelectedTransport));



*/
