import {Component} from "react";
import React from "react";

class SelectedTransport extends Component {
    constructor(props) {
        super(props);
    }
    //
    componentWillMount() {
        console.log(this.props.params)
        // let card = this.props.transports.find((transport)=>transport.id == this.props.params.transportId);
        // this.setState({...card});
    }


    render() {
        console.log(this.match)
        return (
            <div className="selected-transport">
          <section>

                tut
          </section>
            </div>
        );
    }
}

export default SelectedTransport;