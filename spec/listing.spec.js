// Test suit to integration test listing routes with the application.
const request = require("request");
describe("Testing Listing endpoints", () => {
  var server;
  var originalTimeout;
  beforeAll(() => {
    server = require("../app");
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    server.close();
  });
  describe("GET /listing/", () => {
    var data = {};
    beforeAll((done) => {
      request.get("http://localhost:3000/listing/test/", (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
        // console.log(data.body); uncomment to view data on console
      });
    });

    // Testcase 1 : Check for correct response code
    it("should return status 200", () =>{
      expect(data.status).toBe(200);
    });

    // Testcase 2 : Check listing size.
    it("should contain listing size of 0 or more", () => {
      let listing_size = data.body.length;
      expect(listing_size >= 0).toBeTruthy();
    });

    // Testcase 3 : Check if all categories are 'tshirt'
    it("should have the category of ALL the listings as 'tshirt'", () =>{
      let listing_size = data.body.length;
      if(listing_size > 0)
      {
        let isTshirt = true;
        data.body.forEach((listing) => {
          isTshirt &= (listing.category == 'tshirt');
        });
        expect(isTshirt).toBeTruthy();
      }
      expect(listing_size >= 0).toBeTruthy();
    });
  });
});

// it("should return the summary for the given page title", function(done) {
//   frisby
//     .get("http://localhost:3000/listing/test")
//     .then(function(response) {
//       expect(response.status).toBe(200);
//       // expect(response.json.title).toBe("Pikachu");
//       // expect(response.json.pageid).toBe(269816);
//       // expect(response.json.extract).toContain("Pokémon");
//     })
//     .done(done);
// })
