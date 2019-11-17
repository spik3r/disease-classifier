import React, {Component} from 'react';
import HeaderComponent from "../components/HeaderComponent";
import KidneyDiseaseComponent from "../components/KidneyDiseaseComponent";

class KidneyDiseaseScreen extends Component {

    render() {
        return <div className="list-container">
            <HeaderComponent/>
            <KidneyDiseaseComponent/>
        </div>;
    }

}

export default KidneyDiseaseScreen;

