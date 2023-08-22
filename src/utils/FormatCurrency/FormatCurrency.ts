type ValueType = string | number | null | undefined;

export class FormatCurrency {
  private static checkNullAndUndefined(value: ValueType) {
    if (value === null || value === undefined) {
      throw new Error("Invalid value");
    }

    return value;
  }

  private static checkCommaAndDot(value: string) {
    let commaCount = 0;
    let dotCount = 0;

    for (const char of value) {
      if (char === ",") {
        commaCount++;
      }

      if (char === ".") {
        dotCount++;
      }
    }

    if (commaCount > 1 || dotCount > 1 || commaCount + dotCount > 1) {
      throw new Error("Invalid value");
    }

    return value;
  }

  private static parseToString(value: string | number) {
    if (typeof value === "number") {
      return value.toString();
    }

    return value;
  }

  private static parseStringToFloat(value: string) {
    const parsed = parseFloat(value.replace(",", "."));

    if (isNaN(parsed)) {
      throw new Error("Invalid value");
    }
    return parsed;
  }

  static ToBRL(value: ValueType) {
    const nullAndUndefinedChecked = this.checkNullAndUndefined(value);
    const valueString = this.parseToString(nullAndUndefinedChecked);
    const commaAndDotChecked = this.checkCommaAndDot(valueString);
    const valueFloat = this.parseStringToFloat(commaAndDotChecked);

    const result = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueFloat);

    if (result) {
      return result;
    } else {
      throw new Error("Invalid value");
    }
  }
}
