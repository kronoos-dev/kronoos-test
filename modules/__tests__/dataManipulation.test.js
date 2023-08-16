const { processData } = require("../dataManipulation.js");

test("Processes data correctly", (done) => {
  processData((data) => {
    expect(data.length).toBeGreaterThan(0);
    done();
  });
});
