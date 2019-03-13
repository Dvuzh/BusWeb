import React, {PureComponent} from "react";

class FilterTransports extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {activeClasses: [true, false, false, false], filter: -1};
    }

    addActiveClass(index) {
        const activeClasses = [...this.state.activeClasses.map((item, i)=> {return i === index ;})];
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
                            Все
                        </li>
                        <li className={activeClasses[1]? "active" : ""} onClick={() => this.addActiveClass(1)} >
                            Автобусы
                        </li>
                        <li className={activeClasses[2]? "active" : ""} onClick={() => this.addActiveClass(2)} >
                            Трамваи
                        </li>
                        <li className={activeClasses[3]? "active" : ""} onClick={() => this.addActiveClass(3)} >
                            Троллейбусы
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default FilterTransports;