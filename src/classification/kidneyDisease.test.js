import {
    getClassification,
    getCriticalData,
    getDataWithCriticalPercentageChanged,
    getDataWithPercentageChanged,
    getPercentageChange,
    getPercentageChanges,
    sortByDate
} from "./kidneyDisease";
import {getEgfrData, getExtendedEgfrData} from "../data/eGFRData";

describe("kidneyDisease tests", () => {

    describe("classification tests int", () => {

        it("should correctly normal kidney function for eGFR above 90", () => {
            expect(getClassification(100)).toBe("Normal");
        });

        it("should correctly normal kidney function for eGFR at 90", () => {
            expect(getClassification(90)).toBe("Normal");
        });

        it("should correctly classify Mildly Decreased at 89", () => {
            expect(getClassification(89)).toBe("Mildly Decreased");
        });

        it("should correctly classify Mildly Decreased at 60", () => {
            expect(getClassification(60)).toBe("Mildly Decreased");
        });

        it("should correctly classify Mild to Moderate at 59", () => {
            expect(getClassification(59)).toBe("Mild to Moderate");
        });

        it("should correctly classify Mild to Moderate at 45", () => {
            expect(getClassification(45)).toBe("Mild to Moderate");
        });

        it("should correctly classify Moderate to Severe at 30", () => {
            expect(getClassification(30)).toBe("Moderate to Severe");
        });

        it("should correctly classify Moderate to Severe at 44", () => {
            expect(getClassification(44)).toBe("Moderate to Severe");
        });

        it("should correctly classify Severely Decreased at 15", () => {
            expect(getClassification(15)).toBe("Severely Decreased");
        });

        it("should correctly classify Severely Decreased at 29", () => {
            expect(getClassification(29)).toBe("Severely Decreased");
        });

        it("should correctly classify Kidney Failure at 14", () => {
            expect(getClassification(14)).toBe("Kidney Failure");
        });

        it("should correctly classify Kidney Failure at 0", () => {
            expect(getClassification(0)).toBe("Kidney Failure");
        });


    });
    describe("classification tests float", () => {

        it("should correctly normal kidney function for eGFR 100.05", () => {
            expect(getClassification(100.05)).toBe("Normal");
        });

        it("should correctly normal kidney function for eGFR at 90.99", () => {
            expect(getClassification(90.99)).toBe("Normal");
        });

        it("should correctly classify Mildly Decreased at 89.12", () => {
            expect(getClassification(89.12)).toBe("Mildly Decreased");
        });

        it("should correctly classify Mildly Decreased at 60.01", () => {
            expect(getClassification(60.01)).toBe("Mildly Decreased");
        });

        it("should correctly classify Mild to Moderate at 59.3", () => {
            expect(getClassification(59.3)).toBe("Mild to Moderate");
        });

        it("should correctly classify Mild to Moderate at 45.0", () => {
            expect(getClassification(45.0)).toBe("Mild to Moderate");
        });

        it("should correctly classify Moderate to Severe at 30.3", () => {
            expect(getClassification(30.3)).toBe("Moderate to Severe");
        });

        it("should correctly classify Moderate to Severe at 44.11", () => {
            expect(getClassification(44.11)).toBe("Moderate to Severe");
        });

        it("should correctly classify Severely Decreased at 15.15", () => {
            expect(getClassification(15.15)).toBe("Severely Decreased");
        });

        it("should correctly classify Severely Decreased at 29.29", () => {
            expect(getClassification(29.29)).toBe("Severely Decreased");
        });

        it("should correctly classify Kidney Failure at 14.14", () => {
            expect(getClassification(14.14)).toBe("Kidney Failure");
        });

        it("should correctly classify Kidney Failure at 0.1", () => {
            expect(getClassification(0.1)).toBe("Kidney Failure");
        });


    });

    describe("percentage change tests", () => {
        it("should return undefined if previous value is 0", () => {
            expect(getPercentageChange(0, 100.00)).toEqual(100.00);
        });

        it("should return undefined if previous value is 0", () => {
            expect(getPercentageChange(100, 0)).toEqual(-100.00);
        });

        it("should return correct percentage change for increasing negative values", () => {
            expect(getPercentageChange(50, 100)).toEqual(100.00);
        });

        it("should return correct percentage change for equal values", () => {
            expect(getPercentageChange(90, 90)).toEqual(0.00);
        });

        it("should return correct percentage change for decreasing values", () => {
            expect(getPercentageChange(100, 50)).toEqual(-50.00);
        });

        it("should return correct percentage change for decreasing negative values", () => {
            expect(getPercentageChange(100, -50)).toEqual(-150.00);
        });
    });

    describe("sort by date tests", () => {
        it("should return array sorted by date", () => {
            expect(sortByDate(getEgfrData())).toEqual(
                [
                    {eGFR: 70, atDate: '2018/10/20'},
                    {eGFR: 65, atDate: '2018/10/31'}
                ]
            );
        });

        it("should return already sorted array correctly", () => {
            expect(sortByDate(getExtendedEgfrData())).toEqual(
                [
                    {eGFR: 110, atDate: '2018/10/20'},
                    {eGFR: 80, atDate: '2018/10/21'},
                    {eGFR: 60, atDate: '2018/10/25'},
                    {eGFR: 45, atDate: '2018/10/31'}
                ]
            );
        });
    });

    describe("getPercentageChanges tests", () => {
        it("should return correct array of percentage changes", () => {
            expect(getPercentageChanges(sortByDate(getExtendedEgfrData()))).toEqual(
                [0, -27.27, -25, -25]);
        });

        it("should return correct array of percentage changes for sample data", () => {
            expect(getPercentageChanges(sortByDate(getEgfrData()))).toEqual(
                [0, -7.14]);
        });
    })

    describe("getDataWithPercentageChanged tests", () => {
        it("should return correct eGFR, date and percentage change", () => {
            expect(getDataWithPercentageChanged(getEgfrData())).toEqual(
                [
                    {eGFR: 70, atDate: '2018/10/20', percentageChange: 0},
                    {eGFR: 65, atDate: '2018/10/31', percentageChange: -7.14}
                ]);
        });

        it("should return correct eGFR, date and percentage change for extended Data", () => {
            expect(getDataWithPercentageChanged(getExtendedEgfrData())).toEqual(
                [
                    {eGFR: 110, atDate: '2018/10/20', percentageChange: 0},
                    {eGFR: 80, atDate: '2018/10/21', percentageChange: -27.27},
                    {eGFR: 60, atDate: '2018/10/25', percentageChange: -25},
                    {eGFR: 45, atDate: '2018/10/31', percentageChange: -25}
                ]);
        });

    })
    describe("getDataWithCriticalPercentageChanged tests", () => {
        it("should return correct empty array when no changes greater than threshold", () => {
            expect(getDataWithCriticalPercentageChanged(getEgfrData())).toEqual([]);
        });

        it("should return correct eGFR, date and percentage change", () => {
            expect(getDataWithCriticalPercentageChanged(getExtendedEgfrData())).toEqual(
                [
                    {
                        initialReading: {eGFR: 110, atDate: '2018/10/20', percentageChange: 0},
                        latestReading: {eGFR: 80, atDate: '2018/10/21', percentageChange: -27.27}
                    },
                    {
                        initialReading: {eGFR: 80, atDate: '2018/10/21', percentageChange: -27.27},
                        latestReading: {eGFR: 60, atDate: '2018/10/25', percentageChange: -25}
                    },
                    {
                        initialReading: {eGFR: 60, atDate: '2018/10/25', percentageChange: -25},
                        latestReading: {eGFR: 45, atDate: '2018/10/31', percentageChange: -25}
                    },
                ]);
        });

        it("should return correct eGFR, date and percentage change > 27", () => {
            expect(getDataWithCriticalPercentageChanged(getExtendedEgfrData(), 27)).toEqual(
                [
                    {
                        initialReading: {eGFR: 110, atDate: '2018/10/20', percentageChange: 0},
                        latestReading: {eGFR: 80, atDate: '2018/10/21', percentageChange: -27.27}
                    }
                ]);
        });

    })

    describe("getCriticalData tests", () => {
        it("should return correct eGFR, date and percentage change", () => {
            expect(getCriticalData(getEgfrData())).toEqual(
                {
                    eGFR: 65,
                    atDate: '2018/10/31',
                    percentageChange: -7.14,
                    classification: "Mildly Decreased",
                    drops: []
                }
            );
        });

        it("should return correct eGFR, date and percentage change for extended Data", () => {
            expect(getCriticalData(getExtendedEgfrData())).toEqual(
                    {
                        eGFR: 45,
                        atDate: '2018/10/31',
                        percentageChange: -25,
                        classification: "Mild to Moderate",
                        drops: [
                            {
                                initialReading: {eGFR: 110, atDate: '2018/10/20', percentageChange: 0},
                                latestReading: {eGFR: 80, atDate: '2018/10/21', percentageChange: -27.27}
                            },
                            {
                                initialReading: {eGFR: 80, atDate: '2018/10/21', percentageChange: -27.27},
                                latestReading: {eGFR: 60, atDate: '2018/10/25', percentageChange: -25}
                            },
                            {
                                initialReading: {eGFR: 60, atDate: '2018/10/25', percentageChange: -25},
                                latestReading: {eGFR: 45, atDate: '2018/10/31', percentageChange: -25}
                            },
                        ]
                    }
        );
        });

    })
});