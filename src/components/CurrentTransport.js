import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import bus from '../images/bus_index.png';
import tram from '../images/tram_index.png';
import troll from '../images/troll_index.png';

class CurrentTransport extends Component {
    render() {
        const typeTransport = this.props.car.type === 0 ? [ bus , 'Автобус'] : this.props.car.type === 1 ? [ tram, 'Трамвай'] : [ troll, 'Троллейбус'] ;

        return (
            <div className="block-car" id={this.props.car.id}>
                <Link to={`/routes/${this.props.car.id}/stations`}>
                    <div className="bus-title">
                        <img src={typeTransport[0]}
                             className="car-image" alt=""/>
                        <br/>
                        <span
                            className={'red-title'}>{typeTransport[1]} </span>
                        <br/>
                        <span> № {this.props.car.num}</span>
                    </div>
                    <span className="gray-title">({this.props.car.directionOne}/{this.props.car.directionTwo})</span>
                </Link>
            </div>
        );
    }
}

export default withRouter(CurrentTransport);
