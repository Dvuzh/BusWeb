import {Component} from "react";
import React from "react";

class Header extends Component {
    render() {
        return (
            <section>
            <div className="header">
                <div className="inner-content">
                    <div className="counter-title">
                        <span> 286</span>
                        <p> На маршрутах</p>
                    </div>
                </div>
                <div className="inner-content">
                <div className="counter-title">
                    <span> -13 °С</span>
                    <p> На улице</p>
                </div>
                </div>
            </div>
            </section>
        );
    }
}

export default Header;