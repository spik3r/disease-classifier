import React, {Component} from 'react';
import HeaderComponent from "../components/HeaderComponent";
import HomeComponent from "../components/HomeComponent";

class HomeScreen extends Component {

    render() {
        return <div className="list-container">
            <HeaderComponent/>
            <HomeComponent/>
        </div>;
    }

}

export default HomeScreen;

