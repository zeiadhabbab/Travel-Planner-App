const request = require("supertest");
const app = require("../server/index");


describe("Test Server Root Endpoints", () => {
    it("Should response with 200 code after get method ", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
    });
});


describe('POST /api/getFromGeonamesAPI', () => {
    it('should return data from the Geonames API or dummy data', async () => {
      const requestBody = {
        destination: 'New York'
      };
  
      const response = await request(app)
        .post('/api/getFromGeonamesAPI')
        .send(requestBody);
  
      // Check if the status code is 200
      expect(response.status).toBe(200);
  
      // Check if the response contains the expected structure
      // Adjust this part based on the actual structure of the response
      expect(response.body).toBeDefined();
    });
  });