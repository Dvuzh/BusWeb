import React, {PureComponent} from "react";
import axios from "axios/index";
import Geolocation from "./Geolocation";
import TransportStationsMap from "./TransportStationsMap";

const mapState = {center: [54.9924400, 73.3685900], zoom: 11, controls: []};

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
                let placemarks = results.position.map(items => {
                    return items.map(item => item);
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
