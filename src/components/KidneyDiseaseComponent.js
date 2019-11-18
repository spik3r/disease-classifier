import React, {Component} from 'react';
import {getExtendedEgfrData} from "../data/eGFRData";
import {getCriticalData, getPercentageChange, getClassification} from "../classification/kidneyDisease";

const prettyPrint = (data) => {
    const jsonData = JSON.stringify(data);

    return jsonData
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/,/g, '\n')
        .replace(/:/g, ': ')
        .replace(/"/g, '')
        .replace(/{/g, '')
        .replace(/}}/g, '\n- - - - - - - - - - - - - - - - - - \n')
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
            drops: classificationResults.drops,
            previous: classificationResults.drops[classificationResults.drops.length - 1].initialReading
        }
        console.log('previous', this.state.previous)
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
        console.log('handleCLick');
        const classification = getClassification(this.state.eGFR);
        const percentageChange = getPercentageChange(this.state.previous.eGFR, this.state.eGFR);

        console.log('classification', classification);
        console.log('percentageChange', percentageChange);

        this.setState({
            percentageChange: percentageChange,
            classification: classification,

        })
    };

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
            <div className="kidney-results-inner-container">
                <>
                    <h2>Latest</h2>
                    <div className="kidney-input">
                        <label>Date:</label><label className="classification"> {this.state.atDate}</label>
                    </div>
                    <div className="kidney-input">
                        <label>eGFR:</label><input className="classification" value={this.state.eGFR} onChange={this.handleEgfrChange}/>
                        {/*<label className="classification">{this.state.eGFR}</label>*/}
                    </div>
                    <div className="kidney-input">
                        <label>percentageChange:</label><label
                        className="classification">{this.state.percentageChange}</label>
                    </div>
                    <div className="kidney-input">
                        <label>classification:</label><label
                        className={`classification ${this.getClassificationHighlight(this.state.classification)}`}>{this.state.classification}</label>
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
            {/*<div className="kidney-results-inner-container">*/}
            {/*    */}
            {/*</div>*/}
            <div className="kidney-results-inner-container">
                <h2>All Drops</h2>
                <textarea className="kidney-text-area" readOnly value={prettyPrint(this.state.drops)}/>
            </div>
        </div>;
    }

}

export default KidneyDiseaseComponent;