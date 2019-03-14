import React, {PureComponent} from "react";
import CurrentTransport from "./CurrentTransport";

class Transports extends PureComponent {
    state = {buses: [], trams: [], trolleys: []};

    componentDidMount() {
        fetch('/transports/buses')
            .then(res => res.json())
            .then( buses => this.setState(buses));
        fetch('/transports/trams')
            .then(res => res.json())
            .then(trams => this.setState(trams));

        fetch('/transports/trolleys')
            .then(res => res.json())
            .then(trolleys => this.setState(trolleys));
    }

    allCars(transports) {
        const cars = transports;
        const filteredData = [];

        cars.forEach((item) => {
            item.filter((car) => {
                return this.props.filter === -1 ? car.type > this.props.filter : car.type === this.props.filter
            }).forEach((car) => {
                filteredData.push(<CurrentTransport key={car.id} car={car}/>);
            });
        });
        return filteredData;
    }

    render() {
        const transports = [this.state.buses, this.state.trams, this.state.trolleys];  //{buses: [...this.state.buses], trams : [...this.state.trams]} ;
        const allCars = this.allCars(transports);

        return (
            <section>
                <div className="container">
                    <div className="row-transports">
                        {allCars}
                    </div>
                </div>
            </section>
        );
    }
}

export default Transports;