import React, {PureComponent, Component} from "react";
import {withRouter} from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";
import btnSwitch from '../images/btn-switch.png';

import busOnLine from "../images/bus_on_line.png";
import line from "../images/stationline.png";
import styled from 'styled-components';
import {connect} from "react-redux";

function direction(stations, selectedStation) {

    let resultList = [];
    const StyledTd = styled.td`
        visibility: visible;
        opacity: 0.8;    
        margin-left: 15px;
        z-index: 999;
        position: absolute;
        width: 140px;
        color: #000000;
        background: #D5D4FF;
        text-align: center;
        border-radius: 6px;
        box-shadow: 1px 1px 3px #807C71;
        vertical-align: middle;`;
    const TransportNotInStation = styled.img`
        filter: grayscale(100%);
        transition-property: background-color;
        transition-duration: 3s;`;
    const LineTd = styled.td`
        background: url(${line}) top left repeat-y;
        width: 32px;`;
    const AnimateTr = styled.tr`
        transition-property: background-color;
        transition-duration: 3s;`;

    stations.forEach((item, index) => {

        let elementNotStation = null;
        if (selectedStation !== undefined) {
            elementNotStation = selectedStation.find((element) => element.station_id === item.id.toString());
            if (elementNotStation) {
                if (elementNotStation.on_station === "1") {
                    resultList.push(<tr key={item.id}>
                        <LineTd><img src={busOnLine} alt=""/></LineTd>
                        <td>{item.name}</td>
                    </tr>);
                } else {
                    resultList.push(<tr key={item.id}>
                        <LineTd />
                        <td> {item.name}</td>
                    </tr>);
                    resultList.push(<AnimateTr key={'img' + item.id}>
                        <LineTd>
                            <TransportNotInStation src={busOnLine} alt=""/>
                        </LineTd>
                        <StyledTd> {Math.round(elementNotStation.dst_next_st, 1) + "м."} </StyledTd>
                    </AnimateTr>);
                }
            } else {
                resultList.push(<tr key={item.id}>
                    <LineTd />
                    <td> {item.name}</td>
                </tr>);
            }
        }
    });

    return resultList;
}


const ListStations = (props) => {

    return (
        <div>
            <div>
                <span
                    className="station-first-last">{props.listStation[0].name} -<br/> {props.listStation[props.listStation.length - 1].name}</span>

                {props.countDirection === 0 &&
                <div className={'directions-header'}>
                    <button className="btn-switch"
                            onClick={() => {
                                props.updateData(props.direction === 0 ? 1 : 0)
                            }}
                    >
                        <img src={btnSwitch} className="img-switch" alt=""/>
                    </button>
                </div>}
            </div>
            <div className={'hr'}></div>
            <FilteredStations listStation={direction(props.listStation, props.selectedStation)}
                              countTransport={props.countTransport}/>
        </div>
    );
};

class FilterDirection extends Component {
    state = {
        countDirection: 0,
        direction: 0
    };

    updateData = (value) => {
        this.setState({direction: value});
    };

    render() {
        const {countDirection} = this.state;
        const {stations, transport} = this.props;
        const {routes} = this.props;
        let stationsId = [];

        let button = null;
        if (Object.keys(stations).length > 0 || Object.keys(routes).length > 0) {
            if (Object.keys(routes).length > 0) {
                stationsId = routes.map((route) => {
                        return route.map(item => {
                            return {
                                "station_id": item.station_id,
                                "on_station": item.on_station,
                                "dst_next_st": item.dst_next_st
                            }
                        })
                    }
                );
            }
            if (stations.length > 0) {
                if (countDirection === 0) {
                    const listStation = stations.filter((station) => station.direction === this.state.direction);
                    button =
                        <div className="directions directions-one">
                            <ListStations listStation={listStation}
                                          countTransport={this.state.direction === 0 ? transport.directionOne : transport.directionTwo}
                                          countDirection={countDirection} direction={this.state.direction}
                                          updateData={this.updateData}
                                          selectedStation={stationsId[this.state.direction]}
                            />
                        </div>
                } else {
                    const listStationOne = stations.filter((station) => station.direction === 0);
                    const listStationTwo = stations.filter((station) => station.direction === 1);
                    button =
                        <div className="directions directions-two">
                            <ListStations listStation={listStationOne}
                                          countTransport={this.props.transport.directionOne}
                                          countDirection={countDirection} selectedStation={stationsId[0]}/>
                            <ListStations listStation={listStationTwo}
                                          countTransport={this.props.transport.directionTwo}
                                          countDirection={countDirection} selectedStation={stationsId[1]}/>
                        </div>
                }
            }
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

const FilteredStations = (properties) => {
    const StyledTr = styled.tr`  
  display: flex;
  justify-content: center;
  `;
    const StyledTd = styled.td`
    color:red;
    `;
    return (
        <table className="list-station">
            <tbody>
            <StyledTr>
                <td>В данном направлении</td>
                <StyledTd> ({properties.countTransport})ед. </StyledTd>
            </StyledTr>
            {properties.listStation}
            </tbody>
        </table>

    );
};


class StationTransport extends PureComponent {
    render() {
        return (
            <div className="content-current-transport">
                <ScrollUpButton
                    StopPosition={0}
                    ShowAtPosition={50}
                    EasingType='easeInOutExpo'
                    ContainerClassName='scrollup-btn'
                    TransitionClassName='scrollup-btn__toggled'
                />
                <FilterDirection {...this.props} />
            </div>
        );
    }
}

export default connect(
    state => ({
        transport: state.transport,
        stations: state.stations,
        routes: state.routes
    }),
    dispatch => ({ })
)(withRouter(StationTransport));
