import React, {Component} from 'react';
import {getExtendedEgfrData} from "../data/eGFRData";
import {getCriticalData, getPercentageChange, getClassification} from "../classification/kidneyDisease";
import {getClassificationHighlight, prettyPrint} from "./uiHelpers";

class KidneyDiseaseComponent extends Component {

    state = {};

    constructor(props) {
        super(props);
        const data = getExtendedEgfrData();
        const classificationResults = getCriticalData(data);
        this.state = {
            eGFR: classificationResults.eGFR,
            atDate: classificationResults.atDate,
            percentageChange: classificationResults.percentageChange,
            classification: classificationResults.classification,
            drops: classificationResults.drops,
            previous: classificationResults.drops[classificationResults.drops.length - 1].initialReading
        }
    }

    handleEgfrChange = (e) => {
        this.setState({eGFR: e.target.value});
    };

    handlePreviousEgfrChange = (e) => {
        const newPrevious = {
            ...this.state.previous,
            eGFR: e.target.value
        };

        this.setState({previous: newPrevious});
    };


    handleClick = (e) => {
        const classification = getClassification(this.state.eGFR);
        const percentageChange = getPercentageChange(this.state.previous.eGFR, this.state.eGFR);

        this.setState({
            percentageChange: percentageChange,
            classification: classification,
        })
    };

    render() {

        return <div className="kidney-results-container">
            <div className="kidney-results-inner-container">
                <>
                    <h2>Latest</h2>
                    <div className="kidney-input">
                        <label>Date:</label><label className="classification"> {this.state.atDate}</label>
                    </div>
                    <div className="kidney-input">
                        <label>eGFR:</label><input className="classification" value={this.state.eGFR} onChange={this.handleEgfrChange}/>
                    </div>
                    <div className="kidney-input">
                        <label>percentageChange:</label><label
                        className="classification">{this.state.percentageChange}</label>
                    </div>
                    <div className="kidney-input">
                        <label>classification:</label><label
                        className={`classification ${getClassificationHighlight(this.state.classification)}`}>{this.state.classification}</label>
                    </div>

                    <hr className="hr"/>

                    <h2>Previous</h2>
                    <div className="kidney-input">
                        <label>Date:</label><label className="classification"> {this.state.previous.atDate}</label>
                    </div>
                    <div className="kidney-input">

                        <label>eGFR:</label><input className="classification" value={this.state.previous.eGFR} onChange={this.handlePreviousEgfrChange}/>
                    </div>
                    <div className="kidney-input">
                        <label>percentageChange:</label><label
                        className="classification">{this.state.previous.percentageChange}</label>
                    </div>
                    <button className="kidney-classify-button" onClick={this.handleClick}>Classify</button>
                </>
            </div>
            <div className="kidney-results-inner-container">
                <h2>All Drops</h2>
                <textarea className="kidney-text-area" readOnly value={prettyPrint(this.state.drops)}/>
            </div>
        </div>;
    }

}

export default KidneyDiseaseComponent;