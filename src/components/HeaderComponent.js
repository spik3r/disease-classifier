import React from 'react';

const HeaderComponent = () => {
    return <header className="header-container">
        {/*<h1 className="header-heading">Disease Classifier</h1>*/}
        <a className="header-heading" href="#/">Disease Classifier</a>
        <nav className="header-nav">
            <li className="nav-item"><a href="#/heart-disease">Hypertension</a></li>
            <li className="nav-item"><a href="#/kidney-disease">Kidney Disease</a></li>
        </nav>
    </header>;
}
export default HeaderComponent;