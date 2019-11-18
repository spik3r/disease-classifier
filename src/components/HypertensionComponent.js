import React, {Component} from 'react';
import {getClassification, classifyLatest, getClassificationString, classify} from "../classification/hypertension";
import getSampleData from "../data/hypertensionData";
import {getToday} from "../classification/dates";
import {prettyPrint, getClassificationHighlight} from "./uiHelpers";

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
                <label>Classification:</label><p className={`classification-input ${getClassificationHighlight(this.state.classificationResults.classification)}`}>{this.state.classificationResults.classification}</p>
            </div>
            <div className="hypertension-input">
                <textarea className="summaray-text-area" readOnly value={prettyPrint(this.state.classificationResults)}/>
            </div>
            <button className="hypertension-classify-button" onClick={this.handleClick}>Classify</button>
        </div>;
    }


}

export default HypertensionComponent;