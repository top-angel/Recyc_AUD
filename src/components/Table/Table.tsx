import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  header: ReactNode[];
  rows: ReactNode[][];
  onClick?: (i: any) => void;
}

function Table({ header, rows, onClick }: Props) {
  const header_element = header.map((e, i) => (
    <th key={i} className="py-2 text-left last:text-right">
      {e}
    </th>
  ));
  const rows_element = rows.map((r, i) => {
    return (
      <tr
        key={i}
        onClick={() => {
          if (onClick) onClick(r);
        }}
      >
        {r.map((d, j) => {
          return (
            <td
              key={String(i * j + j) + "i"}
              className={classNames(
                "px-3 py-5 text-base text-left last:text-right text-darkgray cursor-pointer hover:opacity-90",
                i % 2 === 0 && "bg-darkgray bg-opacity-10"
              )}
            >
              {d}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div>
      <table className="w-full overflow-auto">
        <thead className="">
          {rows_element.length > 0 && (
            <tr className="text-sm text-darkgray">{header_element}</tr>
          )}
        </thead>
        <tbody>{rows_element}</tbody>
      </table>
    </div>
  );
}

export default Table;
