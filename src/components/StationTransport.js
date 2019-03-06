import React, {PureComponent, Component} from "react";
import {NavLink, withRouter} from "react-router-dom";

class FilterDirection extends Component {

    constructor(props){
        super(props)
        this.state = {stations : this.props.stations,  url: this.props.url}
    }

    render() {
        let {stations} = this.state;

        return (
            <section>
                <div className="container station">
                    <div className="list-direction">
                        <NavLink exact to={`${this.state.url}`}> Одно направление </NavLink>
                        <NavLink exact to={`${this.state.url}/1`}> Оба направления </NavLink>
                    </div>
                    <br/><br/>
                    <span className="station-first-last">{this.state.stations[0]} -<br/> {this.state.stations[1]}</span>
                    <br/>
                    <button className="btn-switch" onClick={() => { stations = stations.reverse(); this.setState({stations: stations });}}> switch</button>
                </div>
            </section>
        );
    }
}

const FilteredStations = (props) => {
    return (
        <section>
            <div className="list-station">
                <ul>
                    {props.stationOne}
                </ul>
            </div>
        </section>
    );
};

class StationTransport extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            buildStationsList: ["пос. Николаевка", "Загородная (по требованию)", "Магазин (ул. Загородная)", "Песчаная",
                "Карьер (ул. Загородная)", "Поворот (ул. Загородная)", "проспект Мира (по требованию)", "Завод Металлист", "ЗСЖБ-5", "Магазин (проспект Мира)",
                "Микрорайон Юбилейный", "Радиостанция", "Социальный рынок (проспект Мира)", "ДОК (проспект Мира)", "Магазин Садко", "ОмГУ", "Нефтезаводская",
                "ДК им. Малунцева", "КДЦ Кристалл", "Технический университет", "Медицинская академия", "СибАДИ", "Арена-Омск (ул. Лукашевича)"],
            countDirections: 1
        };

    }

    direction(stations, directions = false) {
        stations = directions ? stations : stations.reverse();

        const filteredStations = stations.map((item, index)=>{
            return <li key={index}>{item}</li>;
        });

        return filteredStations;
    }

    render() {

        const {buildStationsList} = this.state;
        const stationOne = this.direction(buildStationsList, true);
        const currentUrl = this.props.match.url;

        return (
            <div className="content-current-transport">
                <FilterDirection url={currentUrl} stations={[buildStationsList[0],buildStationsList[buildStationsList.length - 1]]} countDirections={this.state.countDirections}/>

                <FilteredStations stationOne={stationOne}/>
            </div>
        );
    }
}

export default withRouter(StationTransport);