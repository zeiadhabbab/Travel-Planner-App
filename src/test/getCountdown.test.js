const { getCountdown } = require("../client/js/dataSet")

describe('Check For getCountdown', ()=> {
    test('Input Not Date', () => {
        expect(getCountdownVal("Some Text")).toBeFalsy();
    })
    
    test('Input Not Correct Fromat', () => {
        expect(getCountdownVal('11/11/11')).toBeFalsy();
    })
    
    test('Input is in correct fromat', () => {
        expect(getCountdownVal("2025-01-01")).toBeTruthy();
    })

})