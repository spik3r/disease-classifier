import React, {Component} from 'react';
import {getExtendedEgfrData} from "../data/eGFRData";
import {getCriticalData, getPercentageChange} from "../classification/kidneyDisease";

const prettyPrint = (data) => {
    const jsonData = JSON.stringify(data);

    return jsonData
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/,/g, '\n')
        .replace(/:/g, ': ')
        .replace(/"/g, '')
        .replace(/{/g, '')
        .replace(/}/g, '\n');
};

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
            drops: classificationResults.drops
        }
    }

    getClassificationHighlight = (classification) => {
        if (classification === "Mildly Decreased") {
            return "yellow";
        }
        if (classification === "Mild to Moderate") {
            return "orange";
        }
        if (classification === "Moderate to Severe") {
            return "orange-red";
        }
        if (classification === "Severely Decreased") {
            return "red";
        }
        if (classification === "Kidney Failure") {
            return "black";
        }
        if (classification.includes("Unclassified")) {
            return "unknown";
        }
        return "";
    };

    render() {

        return <div className="kidney-results-container">
            <div className="kidney-input">
                <label>Date:</label><p className="classification"> {this.state.atDate}</p>
            </div>
            <div className="kidney-input">
                <label>eGFR:</label><p className="classification" >{this.state.eGFR}</p>
            </div>
            <div className="kidney-input">
                <label>percentageChange:</label><p className="classification" >{this.state.percentageChange}</p>
            </div>
            <div className="kidney-input">
                <label>classification:</label><p className={`classification ${this.getClassificationHighlight(this.state.classification)}`} >{this.state.classification}</p>
            </div>
            <div className="kidney-input">
                <textarea className="kidney-text-area" readOnly value={prettyPrint(this.state.drops)}/>
            </div>
        </div>;
    }

}

export default KidneyDiseaseComponent;