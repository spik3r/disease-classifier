import React, {Component} from 'react';
import HeaderComponent from "../components/HeaderComponent";
import HypertensionComponent from "../components/HypertensionComponent";

class HypertensionScreen extends Component {

    render() {
        return <div className="list-container">
            <HeaderComponent/>
            <HypertensionComponent/>
        </div>;
    }

}

export default HypertensionScreen;

