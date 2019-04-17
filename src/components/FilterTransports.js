import React, {PureComponent} from "react";

class FilterTransports extends PureComponent {

    state = {
        activeClasses: [true, false, false, false]
    };

    addActiveClass(index) {
        const activeClasses = [...this.state.activeClasses.map((item, i) => {
            return i === index;
        })];
        this.setState({activeClasses});
        this.props.updateData(index - 1);
    }

    render() {
        const FILTERS = ['All', 'Buses', 'Trams', 'Trolleybuses'];
        const selectFilter = index => this.addActiveClass(index);

        const activeClasses = this.state.activeClasses;
        return (
            <section>
                <div className="container">
                    <ul className="list-transport">
                        {
                            FILTERS.map((title, index) => (
                                <li key={index} className={activeClasses[index] ? "active" : ""}
                                    onClick={() => selectFilter(index)}>
                                    {title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        );
    }
}

export default FilterTransports;
