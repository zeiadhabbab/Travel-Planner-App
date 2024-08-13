const { checkForUrl } = require("../client/js/urlChecker")

describe('check For Url is Valid', ()=> {
    test('Text is not URL', () => {
        expect(checkForUrl("read")).toBeFalsy();
    })
    
    test('Emails is not URL', () => {
        expect(checkForUrl("mailto:zeiad@gmail.com")).toBeFalsy();
    })
    
    test('https://www.google.com is good url', () => {
        expect(checkForUrl("https://www.google.com")).toBeTruthy();
    })

})