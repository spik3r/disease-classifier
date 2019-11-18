import moment from "moment";

const DATE_FORMAT = 'YYYY/MM/DD.';

const getClassification = (eGFR) => {
    if (eGFR >= 90) {
        return "Normal";
    }
    if (eGFR >= 60) {
        return "Mildly Decreased";
    }
    if (eGFR >= 45) {
        return "Mild to Moderate";
    }
    if (eGFR >= 30) {
        return "Moderate to Severe";
    }
    if (eGFR >= 15) {
        return "Severely Decreased";
    }
    return "Kidney Failure";
};

// Calculate if eGFR dropped by 20% or more in 2 consecutive readings
const getPercentageChange = (prev, current) => {
    const dividend = current - prev;
    const percentageChange = parseFloat(((dividend / prev) * 100).toFixed(2));
    if (percentageChange === Infinity) {
        return current > prev ? 100.00 : -100.00;
    }
    return percentageChange;
};

const sortByDate = (unsorted) => {
    return unsorted.sort((a, b) => moment(a.atDate, DATE_FORMAT).diff(moment(b.atDate, DATE_FORMAT)));
};

const getPercentageChanges = (data) => {
    const sortedData = sortByDate(data);
    const percentageDifference = [];
    sortedData.map((reading, index) => {
        if (index === 0) {
            percentageDifference.push(0);
        } else {
            const change = getPercentageChange(sortedData[index - 1].eGFR, reading.eGFR);
            percentageDifference.push(change);
        }
    });
    return percentageDifference;
};

const getDataWithPercentageChanged = (data) => {
    const sortedData = sortByDate(data);
    const percentageChanges = getPercentageChanges(sortedData);
    const combined = [];

    sortedData.map((reading, index) => {
        combined.push({
            ...reading,
            percentageChange: percentageChanges[index]
        })
    });

    return combined;
};

const getDataWithCriticalPercentageChanged = (data, percentage = 20) => {
    const combinedData = getDataWithPercentageChanged(data);
    const filteredData = [];
    combinedData.map((value, index) => {
        if (index !== 0 && Math.abs(value.percentageChange) > percentage) {
            filteredData.push({initialReading: combinedData[index - 1], latestReading: value});
        }
    });

    return filteredData;
};

const getCriticalData = (data) => {
    const sortedData = sortByDate(data);
    const first = sortedData[sortedData.length - 1];
    const classification = getClassification(first.eGFR);
    const drops = getDataWithCriticalPercentageChanged(sortedData);
    return {
        eGFR: first.eGFR,
        atDate: first.atDate,
        percentageChange: getPercentageChange(sortedData[sortedData.length - 2].eGFR, first.eGFR),
        classification: classification,
        drops: drops
    }
};

export {
    getClassification,
    getPercentageChange,
    sortByDate,
    getPercentageChanges,
    getDataWithPercentageChanged,
    getDataWithCriticalPercentageChanged,
    getCriticalData
} ;