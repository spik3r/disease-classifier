import getSampleData from "./hypertensionData";

describe("test data", () => {
    it("should return expected array of test data", () => {
        expect(getSampleData()).toEqual([
            {SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},
            {SysBP: 115, DiaBP: 100, atDate: '2018/10/20'}
        ]);
    });
});