import React, {PureComponent, Component} from "react";
import {withRouter} from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";
import btnSwitch from '../images/btn-switch.png';

function direction(stations, directions = false) {
    let modStations = stations;
    modStations = directions ? modStations : [...modStations].reverse();
    const filteredStations = modStations.map((item, index) => {
        return <li key={index}>{item}</li>;
    });

    return filteredStations;
}

const ListStations = (props) => {
    return (
        <div>
            <div>
                <span className="station-first-last">{props.first} -<br/> {props.end}</span>
                <br/>
            </div>
            <div className={'hr'}></div>
            <FilteredStations listStation={props.listStation}/>
        </div>
    );
}

class FilterDirection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: this.props.stations,
            url: this.props.url,
            countDirection: 0,
            reverseStations: this.props.stations
        }
    }

    render() {
        const {stations} = this.state;
        const {reverseStations} = this.state;
        const {countDirection} = this.state;

        const stationOne = direction(stations, true);
        const stationTwo = direction(stations);

        let button = null;
        if (countDirection === 0) {
            button =
                <div className="directions directions-one">
                    <div className={'directions-header'}>
                        <span
                            className="station-first-last">{reverseStations[0]} -<br/> {reverseStations[reverseStations.length - 1]}</span>
                        <button className="btn-switch" onClick={() => {
                            this.setState({reverseStations: [...reverseStations].reverse()});
                        }}>
                            <img src={btnSwitch} className="img-switch" alt=""/>
                        </button>
                    </div>
                    <div className={'hr'}></div>
                    <FilteredStations listStation={direction(reverseStations, true)}/>
                </div>
        } else {
            button =
                <div className="directions directions-two">
                    <ListStations first={stations[0]} end={stations[stations.length - 1]} listStation={stationOne}/>
                    <ListStations first={stations[stations.length - 1]} end={stations[0]} listStation={stationTwo}/>
                </div>
        }

        return (
            <section>
                <div className="container station">
                    <div className="list-direction">
                        <button className={'btn-left' + (countDirection === 0 ? ' active' : "")} onClick={() => {
                            this.setState({countDirection: 0})
                        }}>
                            Одно направление
                        </button>

                        <button className={'btn-rigth' + (countDirection === 1 ? ' active' : "")} onClick={() => {
                            this.setState({countDirection: 1})
                        }}>
                            Оба направления
                        </button>
                    </div>
                    <br/><br/>
                    {button}
                </div>
            </section>
        );
    }
}

const FilteredStations = (props) => {
    return (
        <div className="list-station">
            <ul>
                {props.listStation}
            </ul>
        </div>
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

    // componentDidMount() {
    //     fetch('/transports/position')
    //         .then(res => res.json())
    //         .then(res => console.log(res));
    // }

    render() {
        const {buildStationsList} = this.state;
        const currentUrl = this.props.match.url;

        return (
            <div className="content-current-transport">
                <ScrollUpButton
                    StopPosition={0}
                    ShowAtPosition={50}
                    EasingType='easeInOutExpo'
                    ContainerClassName='scrollup-btn'
                    TransitionClassName='scrollup-btn__toggled'
                />
                <FilterDirection url={currentUrl} stations={buildStationsList}
                                 countDirections={this.state.countDirections}/>
            </div>
        );
    }
}

export default withRouter(StationTransport);