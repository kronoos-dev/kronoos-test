import { CSSProperties, useState } from "react";
import "./styles.css";
import { getNestedField } from "../../../utils";
export interface TableHeader {
  text: string | JSX.Element;
  value: string;
  align?: any;
  mask?: (value: any) => string;
  validate?: any;
  color?: (value: any) => string;
  style?: CSSProperties;
  width?: string;
}

type ValidationObject = {
  args: string[];
  function: (...args: any) => any;
};
export interface TableProps {
  headers: TableHeader[];
  items: any[];
  handleScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => any;
}

function Table({ headers, items, handleScroll: scroll }: TableProps) {
  const gridTemplateColumns = headers.reduce((acc) => `${acc} 1fr`, "");
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (scroll) {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
      if (Math.floor(scrollHeight - scrollTop) === clientHeight) {
        scroll(e);
      }
    }
  };

  return (
    <table className="ttable-container">
      <thead className="table-header">
        <tr
          className="table-line-head"
          style={{
            gridTemplateColumns,
          }}
        >
          {headers.map(({ text }, index) => (
            <th key={index} className="table-cell-head">
              {text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body" onScroll={handleScroll}>
        {items.map((item, index) => (
          <tr
            key={index}
            className="table-line"
            style={{
              gridTemplateColumns,
            }}
          >
            {headers.map(({ value, mask = (v) => v, validate }, index) => {
              const nestedValue = getNestedField(item, value);
              let isValid = true;

              switch (typeof validate) {
                case "function":
                  isValid = validate(nestedValue);
                  break;

                case "object":
                  const nestedArgs = validate.args.map((field: string) =>
                    getNestedField(item, field)
                  );
                  isValid = validate.function(...nestedArgs);
                  break;

                default:
                  break;
              }
              return (
                <td
                  key={index}
                  className="table-cell"
                  style={{
                    color: !isValid ? "red" : "black",
                  }}
                >
                  {mask(nestedValue)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
