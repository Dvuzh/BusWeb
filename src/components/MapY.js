import React, {PureComponent} from "react";
import { YMaps, Map } from 'react-yandex-maps';

class MapY extends PureComponent {
    render() {
        // console.log('tut')
        const ContactMap = () => {
            return (
                <YMaps>
                    <div>
                        <Map defaultState={{ center: [54.9924400, 73.3685900], zoom: 10 , width: 600, }} />
                    </div>
                </YMaps>
            );
        };

        return (
            <section>
                <div className="container">
                    <ContactMap />
                </div>
            </section>

        );
    }
}



export default MapY;