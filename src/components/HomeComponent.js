import React from 'react';

const HomeComponent = () => {
    return <header className="home-container">
        <h1 className="home-heading">Select an Organ to Classify</h1>
        <div className="img-nav">

            <a href="#/heart-disease" className="nav-img-container">
                <img src={require("../heart.png")} alt="heart" className="nav-img"/>
            </a>

            <a href="#/kidney-disease" className="nav-img-container">
                <img src={require("../kidney.png")} alt="kidney" className="nav-img"/>
            </a>
        </div>
    </header>;
}
export default HomeComponent;