import {getLast} from "./dates";
import getSampleData from "../data/hypertensionData";

describe("dates tests", () => {

    it("should return object with last date in array", () => {
        expect(getLast(getSampleData())).toEqual({SysBP: 120, DiaBP: 90, atDate: '2018/10/31'});
    });

    it("should gracefully handle empty array", () => {
        expect(getLast([])).toBe(false);
    });

    it("should gracefully handle undefined array", () => {
        expect(getLast(undefined)).toBe(false);
    });

    it("should gracefully handle null array", () => {
        expect(getLast(null)).toBe(false);
    });
});