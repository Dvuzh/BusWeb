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
                        <img src={this.props.car.typeCar === 0 ? bus : this.props.car.typeCar === 1 ? tram : troll}  className="car-image" alt=""/>
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

export default withRouter(CurrentTransport);