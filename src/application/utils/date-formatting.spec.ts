import { describe, expect, it } from "vitest";
import { DateFormatting } from "./date-formatting";

describe('Application Util Tests - Date', () => {
  it('Should be able to transform string date to type Date object', () => {
    const stringDate = '20230521'
    const sut = DateFormatting.transformFromStringToDate(stringDate)
    expect(sut).instanceOf(Date)
  })
})