import React from "react";

type ListItemsProps = {
  user: string;
  scancounts: string;
};

interface LeaderListProps {
  items: Array<ListItemsProps>;
}

const LeaderList = ({ items }: LeaderListProps) => {
  return (
    <ul className="divide !my-1.5 mx-0 flex flex-col">
      {items.map((item: ListItemsProps, index: number) => {
        return (
          <li className="mb-6 flex flex-row rounded-xl bg-white" key={index}>
            <div className="flex flex-1 cursor-pointer select-none items-center p-2">
              <div className="mr-2 flex h-10 w-10 flex-col items-center justify-center font-primary text-lg font-normal text-darkgray">
                {index + 1}
              </div>
              <div className="w-full">
                <div className="text-left font-primary text-lg font-normal text-darkgray">
                  {item.user}
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-light text-darkgray">
                    {item.scancounts}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LeaderList;
