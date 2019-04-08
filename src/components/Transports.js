import React, {PureComponent} from "react";
import CurrentTransport from "./CurrentTransport";
import axios from "axios";

function updateTransport(transports, res) {
    let updateArray = transports;
    updateArray.map(element => {
        const currentCountTransport = res.filter(item => item.id == element.id);

        currentCountTransport.forEach(el => {
            if (el.direction === "0")
                element.directionOne = parseInt(el.on_route_count);
            if (el.direction === "1")
                element.directionTwo = parseInt(el.on_route_count);
        });
    });
    return updateArray;
}

let timerId = 0;

class Transports extends PureComponent {
    state = {buses: [], trams: [], trolleys: []};

    componentDidMount() {
        axios.get('/transports/buses')
            // .then(res => res.json())
            .then(res => res.data)
            .then(buses => this.setState(buses));
        axios.get('/transports/trams')
            // .then(res => res.json())
            .then(res => res.data)
            .then(trams => this.setState(trams));

        axios.get('/transports/trolleys')
            // .then(res => res.json())
            .then(res => res.data)
            .then(trolleys => this.setState(trolleys));

        this.updateCountTransports();
    }

    componentWillUnmount() {
        clearTimeout(timerId);
    };

    updateCountTransports() {
        axios.get('/transports/countall')
            .then(res => res.data)
            .then(res => {
                const buses = updateTransport(this.state.buses, res);
                const trams = updateTransport(this.state.trams, res);
                const trolleys = updateTransport(this.state.trolleys, res);

                this.setState(buses);
                this.setState(trams);
                this.setState(trolleys);

                const countAll = res.map(el => el.on_route_count).reduce((sum, current) => parseInt(sum) + parseInt(current));
                this.props.updateCountAll(countAll);
                timerId = setTimeout(() => {
                    this.updateCountTransports()
                }, 15000);
            });
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
        const transports = [this.state.buses, this.state.trams, this.state.trolleys];
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