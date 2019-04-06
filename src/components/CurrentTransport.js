import React, {Component} from "react";

import bus from '../images/bus_index.png'
import tram from '../images/tram_index.png'
import troll from '../images/troll_index.png'
// alex: импорты из библиотек лучше добавлять в самый верх, ну так просто удобнее
import { Link, withRouter } from "react-router-dom";

// alex: PureComponent или functinal component
class CurrentTransport extends Component {
    render() {
        return (
            <div className="block-car" id={this.props.car.id}>
                <Link to={ `/route/${this.props.car.id}/station` } >
                    <div className="bus-title">
                    {/* alex: я бы вынесла все эти условия перед return и в шаблон уже выбранные значения, иначе сам шаблон читать сложно */}
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
