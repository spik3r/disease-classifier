import {getLast} from "./dates";

const getClassification = (sysBp, diaBp) => {
    // If SysBP is Greater than or Equal to 180 AND DiaBP Greater than or Equal to 120
    // Classification: “Stage 3”.
    if (sysBp >= 180 && diaBp >= 120) {
        return 3;
    }
    // If SysBP is between 160 (inclusive) and 180 (exclusive) OR DiaBP is between 100 (inclusive) and 110 (exclusive)
    // Classification: “Stage 2”
    if ((sysBp >= 160 && sysBp < 180) || (diaBp >= 100 && diaBp < 110)) {
        return 2;
    }

    // If SysBP is between 140 (inclusive) and 160 (exclusive) OR DiaBP is between 90 (inclusive) and 100 (exclusive)
    // Classification: “Stage 1”
    if ((sysBp >= 140 && sysBp < 160) || (diaBp >= 90 && diaBp < 100)) {
        return 1;
    }

    //Todo: Not listed but after some searching this should either be Stage 2 or Unclassified
    if ((diaBp >= 110)) {
        return -1
    }

    return 0;
};

const getClassificationString = (classification) => {
    if (classification === 3) {
        return "Stage 3";
    }
    if (classification === 2) {
        return "Stage 2";
    }
    if (classification === 1) {
        return "Stage 1";
    }
    if (classification === -1) {
        return "Unclassified: Possibly Stage 2 please manually verify";
    }
    return "No Hypertension";
};

const classify = (sysBp, diaBp, date) => {
    const bloodPressure = `${sysBp}/${diaBp}`;
    const classification = getClassification(sysBp, diaBp);
    return {
        bloodPressure: bloodPressure,
        date: date,
        sysBp: sysBp,
        diaBp: diaBp,
        classification: getClassificationString(classification)
    }
};

const classifyLatest = (classificationData) => {
    const latest = getLast(classificationData);
    const date = latest.atDate;
    return classify(latest.SysBP, latest.DiaBP, date)
};
export {getClassification, getClassificationString, classify, classifyLatest} ;