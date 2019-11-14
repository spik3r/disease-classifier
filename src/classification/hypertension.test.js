import {getClassification, classifyLatest, getClassificationString, classify} from "./hypertension";
import getSampleData from "../data/hypertensionData";
import {getToday} from "./dates";

describe("hypertension tests", () => {

    describe("classification tests", () => {
        // If SysBP is Greater than or Equal to 180 AND DiaBP Greater than or Equal to 120
        // Classification: “Stage 3”.
        it("should correctly classify stage 3 both above threshold", () => {
            expect(getClassification(181, 121)).toBe(3);
        });
        it("should correctly classify stage 3 both at threshold", () => {
            expect(getClassification(180, 120)).toBe(3);
        });
        it("should not classify stage 3 when both below threshold", () => {
            expect(getClassification(170, 119)).not.toBe(3);
        });
        it("should not classify stage 3 when sysBp below threshold", () => {
            expect(getClassification(170, 120)).not.toBe(3);
        });
        it("should not classify stage 3 when diaBp below threshold", () => {
            expect(getClassification(180, 119)).not.toBe(3);
        });

        // If SysBP is between 160 (inclusive) and 180 (exclusive) OR DiaBP is between 100 (inclusive) and
        // 110 (exclusive)
        // Classification: “Stage 2”
        it("should correctly classify stage 2 both at upper bound of range", () => {
            expect(getClassification(179, 109)).toBe(2);
        });
        it("should correctly classify stage 2 both in the middle of range", () => {
            expect(getClassification(170, 105)).toBe(2);
        });
        it("should correctly classify stage 2 both at lower bound of range", () => {
            expect(getClassification(160, 100)).toBe(2);
        });
        it("should correctly classify stage 2 if only sysBp is in range", () => {
            expect(getClassification(160, 90)).toBe(2);
        });

        // If SysBP is between 140 (inclusive) and 160 (exclusive) OR DiaBP is between 90 (inclusive) and 100
        // (exclusive)
        // Classification: “Stage 1”
        it("should correctly classify stage 1 both at upper bound of range", () => {
            expect(getClassification(159, 99)).toBe(1);
        });
        it("should correctly classify stage 1 both in the middle of range", () => {
            expect(getClassification(150, 95)).toBe(1);
        });
        it("should correctly classify stage 1 both at lower bound of range", () => {
            expect(getClassification(140, 90)).toBe(1);
        });

        it("should correctly classify stage 0 (No Hypertension) if sysBp below 140 and diaBp below 90", () => {
            expect(getClassification(139, 89)).toBe(0);
        });

        it("should return Unclassified if sysBp below 140 and diaBp above 110 but below 120", () => {
            expect(getClassification(139, 110)).toBe(-1);
        });

        it("should handle 0 input gracefully", () => {
            expect(getClassification(0, 0)).toBe(0);
        });

        it("should handle negative input gracefully", () => {
            expect(getClassification(-1, -1)).toBe(0);
        });

        it("should handle null input gracefully", () => {
            expect(getClassification(null, null)).toBe(0);
        });

        it("should handle undefined input gracefully", () => {
            expect(getClassification(undefined, undefined)).toBe(0);
        });
    });

    describe("getClassificationString tests", () => {
        it("should return correct classification string for classification 3", () => {
            expect(getClassificationString(3)).toEqual("Stage 3");
        });

        it("should return correct classification string for classification 2", () => {
            expect(getClassificationString(2)).toEqual("Stage 2");
        });

        it("should return correct classification string for classification 1", () => {
            expect(getClassificationString(1)).toEqual("Stage 1");
        });

        it("should return correct classification string for classification 0", () => {
            expect(getClassificationString(0)).toEqual("No Hypertension");
        });
    });

    describe("classifyLatest tests", () => {
        it("should return correct blood pressure,  date and classification string", () => {
            expect(classifyLatest(getSampleData())).toEqual({
                "bloodPressure": "120/90",
                "classification": "Stage 1",
                "date": "2018/10/31",
                "diaBp": 90,
                "sysBp": 120
            });
        });

    });

    describe("classify tests", () => {
        it("should return correct blood pressure,  date and classification string", () => {
            expect(classify(180, 120, getToday())).toEqual({
                "bloodPressure": "180/120",
                "classification": "Stage 3",
                "date": getToday(),
                "diaBp": 120,
                "sysBp": 180
            });
        });

    });
});