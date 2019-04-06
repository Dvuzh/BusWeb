import React, {PureComponent} from "react";
import CurrentTransport from "./CurrentTransport";

function updateTransport(transports, res) {
    let updateArray = transports;
    // alex: map ожидает что ты вернешь значение, иначе forEach
    updateArray.map(element => {
        // alex: используй === вместо == (=== сравнение по значению, == сравнение по ссылке)
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
// alex: можно объявить аттрибутом класса компонента
let timerId = 0;

class Transports extends PureComponent {
    // alex: ты же вроде редакс используешь?
    state = {buses: [], trams: [], trolleys: []};

    componentDidMount() {
        // alex: fetch делай в thunk экшене
        fetch('/transports/buses')
            .then(res => res.json())
            .then(buses => this.setState(buses));
        fetch('/transports/trams')
            .then(res => res.json())
            .then(trams => this.setState(trams));

        fetch('/transports/trolleys')
            .then(res => res.json())
            .then(trolleys => this.setState(trolleys));

        this.updateCountTransports();
    }

    componentWillUnmount() {
        clearTimeout(timerId);
    };

    updateCountTransports() {
        // alex: так и просится вынесение этого в санки и вместо setState экшен для редакса
        fetch('/transports/countall')
            .then(res => res.json())
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
        /* alex: как вариант
        const { buses, trams, trolleys } = this.state;
        const allCars = this.allCars([buses, trams, trolleys]);
        */
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
