import React, {PureComponent} from "react";

class FilterTransports extends PureComponent {
    // alex: маленький хак инициализации стейта в классе, и тогда конструктор не нужен
    /*
    state = {
        activeClasses: [true, false, false, false], filter: -1
    };
    */

    constructor(props) {
        super(props);
        // alex: зачем так? почему не создать Set индексов активных фильтров?
        // + я не очень понимаю, на что в компоненте влияет filter
        this.state = {activeClasses: [true, false, false, false], filter: -1};
    }

    addActiveClass(index) {
        const activeClasses = [...this.state.activeClasses.map((item, i)=> {return i === index ;})];
        this.setState({activeClasses});
        this.props.updateData(index - 1)
    }

    /* alex: 
    selectFilter = index => this.addActiveClass(index)

    ...
    вне класса:
    const FILTERS = ['Все', 'Автобусы', ...]
    ...
    в рендере:
    {
        FILTERS.map((title, index) => (
        <li className={activeClasses[index]? "active" : ""} onClick={() => selectFilter(index)}>
            {title}
        </li>
        ))
    }
    */

    render() {
        const activeClasses = this.state.activeClasses;
        return (
            <section>
                <div className="container">
                    <ul className="list-transport">
                    {/* alex: здесь напрашивается map */}
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
