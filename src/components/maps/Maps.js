import React, {PureComponent} from "react";
import axios from "axios/index";
import Geolocation from "./Geolocation";
import TransportStationsMap from "./TransportStationsMap";

const mapState = {center: [54.9924400, 73.3685900], zoom: 11, controls: []};
// const createTemplateLayoutFactory = ymaps => {
//         console.log(ymaps)
//         if (ymaps ) {
//             console.log('tut')
//                const template =  this.props.ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="square_layout">$</div></div>');
//         }
//     }

class Maps extends PureComponent {
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

                            },
                            properties: {
                                balloonContentHeader: "Информация о движени",
                                balloonContentBody: "Время обновления: " + item.upd_time.match(/([0-2][0-9]){1}(:[0-6][0-9]){2}$/g) + "<br>Расстояние до остановки: " + Math.round(item.dst_next_st, 1) + "м. <br> Скорость: " + Math.round(item.speed, 1) + "км/ч ",
                                // hintContent: "Хинт метки"
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
                    (<TransportStationsMap placemarks={this.state.placemarks}
                                           routes={this.state.routes}
                                           stations={this.state.stations}
                                           mapState={mapState}
                    />)}

                    {this.state.transportId === 0 && <Geolocation {...mapState}/>}
                </div>
            </section>
        );
    }
}

export default Maps;
