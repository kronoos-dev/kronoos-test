describe("Formatted Date", () => {
  it("should parse date correctly", () => {
    const dateString = "20230815";
    const mockParsedDate = new Date(2023, 7, 15);

    const parseStub = sinon.stub(parse, "parse").returns(mockParsedDate);

    const result = formattedDate(dateString);

    expect(parseStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockParsedDate);

    parseStub.restore();
  });
});
