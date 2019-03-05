import {Component} from "react";
import React from "react";

import bus from '../images/bus_index.png'
import tram from '../images/tram_index.png'
import troll from '../images/troll_index.png'

import { Link } from "react-router-dom";

class CurrentTransport extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="block-car">
                <Link to={ `/route/${this.props.car.id}` } >
                    <div className="bus-title">
                        <img src={this.props.car.typeCar === 0 ? bus : this.props.car.typeCar === 1 ? tram : troll}  className="car-image" />
                        <br/>
                        {this.props.car.typeCar === 0 ? 'Автобус' : this.props.car.typeCar === 1 ? 'Трамвай' : 'Троллейбус'}
                        <br/>
                        <span> № {this.props.car.num}</span>
                    </div>
                   <span>({this.props.car.directionOne} / {this.props.car.directionTwo})</span>
                </Link>
            </div>
        );
    }
};

export default CurrentTransport;