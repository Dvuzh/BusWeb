import {Component} from "react";
import React from "react";

import bus from '../images/bus_index.png'
import tram from '../images/tram_index.png'
import troll from '../images/troll_index.png'

import { BrowserRouter , Route, Link, Redirect, withRouter } from "react-router-dom";
import SelectedTransport from "./SelectedTransport";

class CurrentTransport extends Component {

    constuctor() {
        this.redirectToNewPage = this.redirectToNewPage.bind(this);
    }

    redirectToNewPage(index){
        let path = `/route/${index}`;
        // console.log(this.props.history)
        // Router.pushState(null,path);
console.log('tut')
        return (<SelectedTransport />);
    }

    render() {
        return (
            <div className="block-car">
                <BrowserRouter>
                    {/*<a href={`/route/${this.props.car.id}`} >*/}
                <Link to={`/route/${this.props.car.id}`} > Click
                    {/*<a>*/}
                    <div className="bus-title">
                        <img src={this.props.car.typeCar === 0 ? bus : this.props.car.typeCar === 1 ? tram : troll}  className="car-image" />
                        <br/>
                        {this.props.car.typeCar === 0 ? 'Автобус' : this.props.car.typeCar === 1 ? 'Трамвай' : 'Троллейбус'}
                        <br/>
                        <span> № {this.props.car.num}</span>
                    </div>

                   <span>({this.props.car.count} / {this.props.car.active})</span>
                    {/*</a>*/}
                </Link>
                </BrowserRouter>
            </div>
        );
    }
}

export default CurrentTransport;