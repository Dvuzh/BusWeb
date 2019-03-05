import {Component} from "react";
import React from "react";
import CurrentTransport from "./CurrentTransport";

class Transports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buses: [{num: 1, count: 5, active: 2, id: 1, type: 0}, {num: 2, count: 7, active: 2, id: 2, type: 0}, {num: 3, count: 6, active: 5, id: 3, type: 0},
                {num: 21, count: 5, active: 2, id: 10, type: 0}, {num: 23, count: 5, active: 2, id: 12, type: 0}, {num: 91, count: 5, active: 2, id: 14, type: 0},
                {num: 22, count: 5, active: 2, id: 11, type: 0}, {num: 24, count: 5, active: 2, id: 13, type: 0}, {num: 109, count: 5, active: 2, id: 15, type: 0}],
            trams: [{num: 8, count: 5, active: 2, id: 4, type: 1}, {num: 6, count: 7, active: 2, id: 5, type: 1}, {num: 3, count: 6, active: 5, id: 6, type: 1}],
            trolleys: [{num: 21, count: 9, active: 2, id: 7, type: 2}, {num: 22, count: 7, active: 2, id: 8, type: 2}, {num: 23, count: 8, active: 6, id: 9, type: 2}]
        };
    }

    allCars(transports){
        const cars = transports;
        const filteredData = [];

        cars.forEach((item)=> {
            item.filter((car)=> {return this.props.filter === -1 ? car.type > this.props.filter : car.type === this.props.filter}).forEach((car)=> {
                filteredData.push( <CurrentTransport key={car.id} car={car} />);
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