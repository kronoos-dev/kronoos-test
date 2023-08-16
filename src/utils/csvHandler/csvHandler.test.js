const chai = require("chai");
const sinon = require("sinon");
const { csvHandler } = require("./csvHandler");

const expect = chai.expect;

describe("csvHandler", () => {
  it("should parse CSV file and return data as an array", async () => {
    const createReadStreamStub = sinon.stub();
    createReadStreamStub.returns({
      pipe: sinon.stub().returnsThis(),
      on: sinon.stub().callsArgWith(1, { name: "John", age: "25" }).callsArg(1),
    });

    sinon.replace(require("fs"), "createReadStream", createReadStreamStub);

    const parsedData = csvHandler("dummy/path.csv");

    sinon.restore();

    expect(parsedData).to.deep.equal([
      { name: "John", age: "25" },
      { name: "Jane", age: "30" },
    ]);
  });
});
