import React, {Component} from "react";
import {YMaps, Map, Placemark, Polyline} from 'react-yandex-maps';
import bus_now from '../images/bus_now.png';
import styled from 'styled-components';

const mapState = {center: [54.9924400, 73.3685900], zoom: 11, controls: []};
const ContactMap = (props) => {
    return (
        <YMaps>
            <Map state={mapState} width="100%" height="500px">
                {props.placemarks.length !== 0 && props.placemarks.map((placemarkParams, i) =>
                    <Placemark key={i} {...placemarkParams} />
                )}

                {props.routes.length !== 0 && props.routes.map((routes, i) =>
                    <Polyline key={i}
                              geometry={[...routes.directions]}
                              options={{
                                  balloonCloseButton: false,
                                  strokeColor: '#0000ff',
                                  strokeWidth: 2,
                                  strokeOpacity: 0.9,
                              }}
                    />
                )}
            </Map>
        </YMaps>
    );
};
class MapY extends Component {
    state = {
        placemarks: [],
        routes: []
    };

   componentDidMount() {

        setInterval(() => {
            fetch('/transports/position')
                .then(result => result.json())
                .then(results => {
                    let placemarks = [];
                    results.position.map(result => {
                        result.map(item => {
                            placemarks.push({
                                geometry: {
                                    type: 'Point',
                                    coordinates: [item.latitude, item.longitude]
                                },
                                options: {
                                    iconLayout: 'default#image',
                                    // iconLayout: this.context.ymaps.templateLayoutFactory.createClass([
                                    //     '<div style="transform:rotate({{options.rotate}}deg);">',
                                    //     '{% include "default#image" %}',
                                    //     '</div>'
                                    // ].join('')),
                                    // iconRotate: 90,
                                    iconImageHref: bus_now,
                                    iconImageSize: [20, 20],
                                    iconImageOffset: [-10, -10],
                                    // transform: '90deg'
                                    // iconRotate: 180
                                }
                            });
                        });
                    });
                    this.setState({placemarks});
                });

        }, 15000);



        fetch('/transports/route-transport')
            .then(result => result.json())
            .then((result) => {
                let routes = [];
                result.line.map(items => {
                    const directions = items.data.map(item => {
                        return [item.latitude, item.longitude];
                    });
                    routes.push({ directions });
                });
                this.setState({routes});
            });
    }

    render() {

        return (
            <section>
                <div className="container">
                    <ContactMap placemarks={this.state.placemarks} routes={this.state.routes}/>
                </div>
            </section>
        );
    }
}


export default MapY;