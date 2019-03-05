import {Component} from "react";
import React from "react";
import {BrowserRouter, NavLink, Route} from "react-router-dom";

class StationTransport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: ["пос. Николаевка", "Загородная (по требованию)", "Магазин (ул. Загородная)", "Песчаная",
                "Карьер (ул. Загородная)", "Поворот (ул. Загородная)", "проспект Мира (по требованию)", "Завод Металлист", "ЗСЖБ-5", "Магазин (проспект Мира)",
                "Микрорайон Юбилейный", "Радиостанция", "Социальный рынок (проспект Мира)", "ДОК (проспект Мира)", "Магазин Садко", "ОмГУ", "Нефтезаводская",
                "ДК им. Малунцева", "КДЦ Кристалл", "Технический университет", "Медицинская академия", "СибАДИ", "Арена-Омск (ул. Лукашевича)"]
        };

    }

    direction(stations, directions) {

        const filteredStations = [];

        stations.forEach((item, index) => {
            filteredStations.push(<li key={index}>{item}</li>);
        });
        return filteredStations;
    }

    render() {
        const stationsTransports = this.state.direction;
        const stationOne = this.direction(stationsTransports, 0);
        const currentUrl = this.props.match.url;

        // const checkActive = (match, location) => {
        //     console.log(match, location)
        //     //some additional logic to verify you are in the home URI
        //     if(!location) return false;
        //     const {pathname} = location;
        //     console.log(pathname);
        //     return pathname === currentUrl;
        // }

        console.log(currentUrl);
        const FilterDirection = () => (
            <section>
                <BrowserRouter>
                    <div className="container">
                        <div className="list-direction">
                            <NavLink activeClassName="active" exact to={`${currentUrl}/0`} > Одно направление </NavLink>
                            <NavLink activeClassName="active" exact to={`${currentUrl}/1`} > Оба направления </NavLink>
                        </div>
                    </div>
                </BrowserRouter>
            </section>
        );
        const FilteredStations = () => (
            <section>
                <div className="list-station">
                    <ul>
                        {stationOne}
                    </ul>
                </div>
            </section>
        );
        return (
            <div className="content-current-transport">
                <FilterDirection/>
                <FilteredStations/>
            </div>
        );
    }
}

export default StationTransport;