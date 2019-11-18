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

const getClassificationHighlight = (classification) => {
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

export {prettyPrint, getClassificationHighlight};