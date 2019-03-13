import React, {PureComponent} from "react";

import bus from '../images/bus_index.png'
import tram from '../images/tram_index.png'
import troll from '../images/troll_index.png'

import { Link, withRouter } from "react-router-dom";

class CurrentTransport extends PureComponent {

    render() {
        return (
            <div className="block-car">
                <Link to={ `/route/${this.props.car.id}/station` } >
                    <div className="bus-title">
                        <img src={this.props.car.type === 0 ? bus : this.props.car.type === 1 ? tram : troll}  className="car-image" alt=""/>
                        <br/>
                        <span className={'red-title'}>{this.props.car.type === 0 ? 'Автобус' : this.props.car.type === 1 ? 'Трамвай' : 'Троллейбус'} </span>
                        <br/>
                        <span> № {this.props.car.num}</span>
                    </div>
                   <span className="gray-title">({this.props.car.directionOne}/{this.props.car.directionTwo})</span>
                </Link>
            </div>
        );
    }
};

export default withRouter(CurrentTransport);