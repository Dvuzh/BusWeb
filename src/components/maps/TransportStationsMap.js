import React from "react";
import {Map, Placemark, Polyline, YMaps} from "react-yandex-maps";
import bus_station from "../../images/map_bus_station.png";

// alex: здесь очень много больших компонентов в одном файле, было бы удобнее их в разные файлы и в папочку maps, например
const TransportStationsMap = (props) => {
    /*
    alex:

    сonst { stations, direction } = props;
    */

    return (
        <YMaps>
            <Map state={props.mapState} width="100%" height="500px"
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

export default TransportStationsMap;