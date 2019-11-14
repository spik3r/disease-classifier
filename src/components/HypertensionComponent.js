import React, {Component} from 'react';
import {getClassification, classifyLatest, getClassificationString, classify} from "../classification/hypertension";
import getSampleData from "../data/hypertensionData";
import {getToday} from "../classification/dates";

const prettyPrint = (data) => {
    const jsonData = JSON.stringify(data);

    return jsonData
        .replace(/,/g, '\n')
        .replace(/:/g, ': ')
        .replace(/"/g, '')
        .replace(/{/g, '')
        .replace(/}/g, '');
};

class HypertensionComponent extends Component {

    state = {};

    constructor(props) {
        super(props);
        const data = getSampleData();
        const classificationResults = classifyLatest(data);
        this.state = {
            sysBp: classificationResults.sysBp,
            diaBp: classificationResults.diaBp,
            classificationResults: classificationResults,
            date: getToday()
        }
    }

    handleClick = (e) => {
        const newClassification = getClassification(this.state.sysBp, this.state.diaBp);
        const classificationString = getClassificationString(newClassification);
        this.setState({
            classificationResults: classify(this.state.sysBp, this.state.diaBp, this.state.date),
            classification: classificationString
        })
    };


    handleSysBpChange = (e) => {
        this.setState({sysBp: e.target.value});
    };

    handleDiaBpChange = (e) => {
        this.setState({diaBp: e.target.value});
    };

    getClassificationHighlight = (classification) => {
        if (classification === "Stage 1") {
            return "blue";
        }
        if (classification === "Stage 2") {
            return "yellow";
        }
        if (classification === "Stage 3") {
            return "red";
        }
        if (classification.includes("Unclassified")) {
            return "unknown";
        }
        return "";
    };

    render() {

        return <div className="hypertension-results-container">
            <div className="hypertension-input">
                <label>Date:</label><input className="date-input" value={this.state.classificationResults.date || this.state.date} readOnly/>
            </div>
            <div className="hypertension-input">
                <label>Systolic Pressure:</label><input className="sys-bp-input" value={this.state.sysBp}
                                                        onChange={this.handleSysBpChange}/>
            </div>
            <div className="hypertension-input">
                <label>Diastolic Pressure:</label><input className="dia-bp-input" value={this.state.diaBp}
                                                         onChange={this.handleDiaBpChange}/>
            </div>
            <div className="hypertension-input">
                <label>Classification:</label><p className={`classification-input ${this.getClassificationHighlight(this.state.classificationResults.classification)}`}>{this.state.classificationResults.classification}</p>
            </div>
            <div className="hypertension-input">
                <textarea className="summaray-text-area" readOnly value={prettyPrint(this.state.classificationResults)}/>
            </div>
            <button className="hypertension-classify-button" onClick={this.handleClick}>Classify</button>
        </div>;
    }


}

export default HypertensionComponent;