import {Map, Placemark, Polyline, YMaps} from "react-yandex-maps";
import bus_station from "../../images/map_bus_station.png";
import bus_now from "../../images/bus_now.png";
import React, {PureComponent} from "react";
import {connect} from "react-redux";


class TransportStationsMap extends PureComponent {

    state = {map: null, ymaps: null, iconContentTemplate: null};

    createTemplateLayoutFactory = ymaps => {
        if (ymaps) {
            this.setState({
                iconContentTemplate: ymaps.templateLayoutFactory.createClass([
                    '<div style="transform:rotate({{ properties.iconContent }}deg);">',
                    '{% include "default#image" %}',
                    '</div>'
                ].join(''))
            });
        }
    };

    render() {
        return (
            <YMaps query={{ lang: 'en_RU' }}>
                <Map state={this.props.mapState} width="100%" height="500px"
                     modules={['geoObject.addon.balloon', 'templateLayoutFactory', 'Placemark', 'layout.ImageWithContent']}
                     onLoad={this.createTemplateLayoutFactory}
                     instanceRef={ref => this.setState({map: ref})}
                >
                    {this.props.stations.length !== 0 && this.props.stationsI.length !== undefined &&
                    this.props.stations.map((direction, i) =>
                        direction.map((station, index) => {
                            const buses = this.props.stationsI[index].transports.filter(item => item.type === 0);
                            const trams = this.props.stationsI[index].transports.filter(item => item.type === 1);
                            const trolleys = this.props.stationsI[index].transports.filter(item => item.type === 2);

                            let str = '';
                            if (buses.length > 0) str += "<br/>Buses: " + buses.map(item => item.num);
                            if (trams.length > 0) str += "<br/>Trams: " + trams.map(item => item.num);
                            if (trolleys.length > 0) str += "<br/>Trolleybuses: " + trolleys.map(item => item.num);


                            return < Placemark
                                key={index}
                                geometry={[station.latitude, station.longitude]}

                                properties={
                                    {
                                        balloonContentHeader: "Bus Stop Name",
                                        balloonContentBody:
                                            station.name + str
                                    }
                                }

                                options={
                                    {
                                        iconLayout: 'default#image',
                                        iconImageHref: bus_station,
                                        iconImageSize: [20, 20],
                                        iconImageOffset: [-10, -10],
                                    }
                                }
                            />
                        })
                    )}

                    {this.props.placemarks.length !== 0 && this.state.iconContentTemplate && this.props.placemarks.map((direction, i) =>
                        direction.map((item, index) =>
                            <Placemark key={index}
                                       geometry={{
                                           type: 'Point',
                                           coordinates: [item.latitude, item.longitude]
                                       }}

                                       properties={{
                                           balloonContentHeader: "Vehicle Info",
                                           balloonContentBody: "Update Time: " + item.upd_time.match(/([0-2][0-9]){1}(:[0-6][0-9]){2}$/g) + "<br>Distance To Next Stop: " + Math.round(item.dst_next_st, 1) + "м. <br>  Speed: " + Math.round(item.speed, 1) + "km/h ",
                                           iconContent: -item.azimuth
                                       }}

                                       options={{
                                           iconLayout: this.state.iconContentTemplate,
                                           iconImageHref: bus_now,
                                           iconImageSize: [30, 30],
                                           iconImageOffset: [-15, -15],
                                           iconShape: {
                                               type: 'Circle',
                                               coordinates: [0, 0],
                                               radius: 6
                                           }
                                       }}
                            />
                        )
                    )}


                    {this.props.routes.length !== 0 && this.props.routes.map((routes, i) =>
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
        )
    };
}

export default connect(
    state => ({stationsI: state.stations, transport: state.routes,}),
    dispatch => ({})
)(TransportStationsMap);