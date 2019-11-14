import React from 'react';

const HeaderComponent = () => {
    return <header className="header-container">
        <h1 className="header-heading">Disease Classifier</h1>
        <nav className="header-nav">
            <li className="nav-item"><a href="#/">Hypertension</a></li>
            <li className="nav-item"><a href="#/kidney-disease">Kidney Disease</a></li>
        </nav>
    </header>;
}
export default HeaderComponent;