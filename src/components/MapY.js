import {Component} from "react";
import React from "react";

import { YMaps, Map } from 'react-yandex-maps';

class MapY extends Component {

    ContactMap () {
        return (
            <YMaps>
                <div>
                    <Map defaultState={{ center: [54.9924400, 73.3685900], zoom: 10 , width: 600, }} />
                </div>
            </YMaps>
        );
    }

    render() {
        return (
            <section>
                <div className="container">
                    {this.ContactMap()}
                </div>
            </section>

        );
    }
}



export default MapY;