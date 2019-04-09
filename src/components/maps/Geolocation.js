import React from "react";
import {YMaps, Map} from 'react-yandex-maps';

const setAutoCenter = (ymaps, map) => {
    ymaps.geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
    }).then(function (result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        map.geoObjects.add(result.geoObjects);
    });
};

const GeolocationMap = (mapState) => {
    let map = null;
    return (
        <YMaps query={{
            apikey: "e6c3845d-36f8-44db-8046-aad82a5cd030",
        }}>
            <Map state={mapState} width="100%" height="500px" modules={['geolocation']}
                 onLoad={ymaps => setAutoCenter(ymaps, map)} instanceRef={ref => map = ref}/>
        </YMaps>
    );
};

export default GeolocationMap;