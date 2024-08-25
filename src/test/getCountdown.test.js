const { getCountdownVal } = require("../client/js/dataSet")

describe('Check For getCountdownVal', ()=> {
    test('Input Not Date', () => {
        expect(getCountdownVal("Some Text")).toBeFalsy();
    })
  
    test('Input is in correct fromat', () => {
        expect(getCountdownVal("2025-01-01")).toBeTruthy();
    })

})