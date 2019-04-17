import React, {PureComponent} from "react";
import axios from "axios/index";
import Geolocation from "./Geolocation";
import TransportStationsMap from "./TransportStationsMap";

const mapState = {center: [54.9924400, 73.3685900], zoom: 11, controls: []};
const arrru = new Array('Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ы', 'ы', 'Ь', 'ь', 'Ъ', 'ъ', 'Э', 'э');
const arren = new Array('Ya', 'ya', 'Yu', 'yu', 'Ch', 'ch', 'Sh', 'sh', 'Sh', 'sh', 'Zh', 'zh', 'A', 'a', 'B', 'b', 'V', 'v', 'G', 'g', 'D', 'd', 'E', 'e', 'E', 'e', 'Z', 'z', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'F', 'f', 'H', 'h', 'C', 'c', 'Y', 'y', '`', '`', '\'', '\'', 'E', 'e');

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

        axios.get(`/transports/position/${this.state.transportId}`)
            .then(result => result.data)
            .then(results => {
                let placemarks = results.position.map(items => {
                    return items.map(item => item);
                });
                this.setState({placemarks});
            });
    }


    cyrillToLatin(text) {
        for (var i = 0; i < arrru.length; i++) {
            var reg = new RegExp(arrru[i], "g");
            text = text.replace(reg, arren[i]);
        }
        return text;
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
                    let routes = [];
                    result.line.forEach(items => {
                        const directions = items.data.map(item => {
                            return [item.latitude, item.longitude];
                        });
                        routes.push({directions});
                    });

                    let stations = result.station.map(items => {
                        return items.map(item => {
                            return {
                                index: item.index,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                name: this.cyrillToLatin(item.name)
                            }
                        });
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
                    (<TransportStationsMap
                        placemarks={this.state.placemarks}
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
