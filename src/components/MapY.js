import React, {Component} from "react";
import {YMaps, Map, Placemark, Polyline} from 'react-yandex-maps';
import bus_station from "../images/map_bus_station.png"
import axios from "axios";

// import bus_now from '../images/bus_now.png';
// import styled from 'styled-components';


const mapState = {center: [54.9924400, 73.3685900], zoom: 11, controls: []};
// const createTemplateLayoutFactory = ymaps => {
//         console.log(ymaps)
//         if (ymaps ) {
//             console.log('tut')
//                const template =  this.props.ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="square_layout">$</div></div>');
//         }
//     }

// alex: здесь очень много больших компонентов в одном файле, было бы удобнее их в разные файлы и в папочку maps, например
const ContactMap = (props) => {
    /*
    alex:

    сonst { stations, direction } = props;
    */

    return (
        <YMaps>
            <Map state={mapState} width="100%" height="500px"
                 modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
                {/* alex: просто props.stations.length, 0 -- это falsy value */}
                {props.stations.length !== 0 &&
                props.stations.map((direction, i) =>
                    direction.map((station, index) =>
                        <Placemark key={index}
                                   geometry={[station.latitude, station.longitude]}

                                   properties={{
                                       balloonContentHeader: "Остановка",
                                       balloonContentBody: station.name,
                                       // hintContent: "Хинт метки"
                                   }}
                                   options={{
                                       iconLayout: 'default#image',
                                       iconImageHref: bus_station,
                                       iconImageSize: [20, 20],
                                       iconImageOffset: [-15, -15],
                                   }}
                        />
                    )
                )}

                {props.placemarks.length !== 0 && props.placemarks.map((placemarkParams, i) =>
                    <Placemark key={i} {...placemarkParams} />
                )}

                {props.routes.length !== 0 && props.routes.map((routes, i) =>
                    <Polyline key={i}
                              geometry={[...routes.directions]}
                              options={{
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

const setAutoCenter = (ymaps, map) => {
    ymaps.geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        map.geoObjects.add(result.geoObjects);
    });
};

const GeolocationMap = () => {
    let map = null;
    return (
        <YMaps>
            <Map state={mapState} width="100%" height="500px" modules={['geolocation']}
                 onLoad={ymaps => setAutoCenter(ymaps, map)} instanceRef={ref => map = ref}/>
        </YMaps>
    );
};
// alex: PureComponent
class MapY extends Component {
    state = {
        template: null,
        placemarks: [],
        routes: [],
        transportId: 0,
        timerId: 0,
        stations: [],
    };

    getPosition() {

        // alex: фетч лучше в санки, и используй async/await, then уже не модно
        axios.get(`/transports/position/${this.state.transportId}`)
            .then(result => result.data)
            .then(results => {
                let placemarks = [];

                results.position.forEach(result => {
                    result.forEach(item => {
                        placemarks.push({
                            geometry: {
                                type: 'Point',
                                coordinates: [item.latitude, item.longitude]
                            },
                            options: {
                                // iconLayout: 'default#image',
                                // iconImageHref: bus_now,
                                preset: 'islands#blueMassTransitCircleIcon',
                                iconColor: '#f65152',
                                iconImageSize: [20, 20],
                                iconImageOffset: [-10, -10],

                            }
                        });
                    });
                });
                this.setState({placemarks});
            });
    }

    componentWillMount() {
        this.setState({transportId: !!this.props.match ? this.props.match.params.transportId : 0});
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    componentDidMount() {
        if (this.state.transportId > 0) {
            this.getPosition();

            let timerId = setInterval(() => {
                this.getPosition();
            }, 15000);

            this.setState({timerId});

// alex: угадай коммент :D
            axios.get(`/transports/route-transport/${this.state.transportId}`)
                .then(result => result.data)
                .then((result) => {
                    // console.log(result)
                    let routes = [];
                    result.line.forEach(items => {
                        const directions = items.data.map(item => {
                            return [item.latitude, item.longitude];
                        });
                        routes.push({directions});
                    });

                    let stations = result.station.map(items => {
                        return items.map(item => item);
                    });
                    this.setState({routes});
                    this.setState({stations});
                });
        }
    }

    render() {
        return (
            <section>
                <div className="container">
                    {this.state.transportId > 0 &&
                    (<ContactMap placemarks={this.state.placemarks} 
                                routes={this.state.routes}
                                stations={this.state.stations}
                    />)}
                    {this.state.transportId === 0 &&
                    <GeolocationMap/>}
                </div>
            </section>
        );
    }
}

export default MapY;
