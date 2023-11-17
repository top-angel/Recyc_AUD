import React from "react";
import Image from "next/image";

type ListItemsProps = {
  image: string;
  title: string;
  date: string;
  content: string;
};

interface IncidentsListProps {
  items: Array<ListItemsProps>;
}

const IncidentsList = ({ items }: IncidentsListProps) => {
  return (
    <ul className="divide !my-1.5 mx-3 flex flex-col">
      {items.map((item: ListItemsProps, index: number) => {
        return (
          <li
            className="my-1.5 flex flex-row rounded-xl border border-orange bg-gray"
            key={index}
          >
            <div className="flex flex-1 cursor-pointer select-none items-center p-4">
              <div className="mr-4 flex h-10 w-10 flex-col items-center justify-center">
                <a href="#" className="relative block hover:border-none">
                  <Image
                    src={item.image}
                    alt="addIncident"
                    className="mx-auto w-10 rounded-xl object-cover"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
              <div className="w-full">
                <div className="text-left font-primary text-lg font-normal text-darkgray">
                  {item.title}
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-light text-darkgray">
                    {item.date}
                  </div>
                  <div className="text-sm font-light text-darkgray">
                    {item.content}
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

export default IncidentsList;
