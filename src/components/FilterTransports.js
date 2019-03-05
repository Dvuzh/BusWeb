import {Component} from "react";
import React from "react";

class FilterTransports extends Component {
    constructor(props) {
        super(props);
        this.state = {activeClasses: [true, false, false, false], filter: -1};
        this.addActiveClass= this.addActiveClass.bind(this);
    }

    addActiveClass(index) {
        const activeClasses = [...this.state.activeClasses.map((item, i)=> {return i === index ? true : false;})];
        this.setState({activeClasses});
        this.props.updateData(index - 1)
    }

    render() {
        const activeClasses = this.state.activeClasses;
        return (
            <section>
                <div className="container">
                    <ul className="list-transport">
                        <li className={activeClasses[0]? "active" : ""} onClick={() => this.addActiveClass(0)} >
                            <a>Все</a>
                        </li>
                        <li className={activeClasses[1]? "active" : ""} onClick={() => this.addActiveClass(1)} >
                            <a>Автобусы</a>
                        </li>
                        <li className={activeClasses[2]? "active" : ""} onClick={() => this.addActiveClass(2)} >
                            <a>Трамваи</a>
                        </li>
                        <li className={activeClasses[3]? "active" : ""} onClick={() => this.addActiveClass(3)} >
                            <a>Троллейбусы</a>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default FilterTransports;