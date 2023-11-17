import { ReactNode, useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

type props = {
  headers: Array<string>;
  children?: ReactNode;
  onTabClick?: (index: number) => void;
};

export default function CustomTab({ headers, children, onTabClick }: props) {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex justify-between p-1 space-x-1 rounded-xl">
          {headers.map((header: string, index: number) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  "rounded-xl px-3 py-2.5 text-base font-medium leading-5 text-darkgray",
                  { "bg-purple bg-opacity-20 outline-none": selected },
                  { hidden: header === " " }
                )
              }
              // onClick={() => onTabClick && onTabClick(index)}
            >
              {header}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
