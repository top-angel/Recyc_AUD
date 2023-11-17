import React, { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineCheck, HiChevronDown } from "react-icons/hi";
const people = [
  { id: 1, name: "Last Week", unavailable: false },
  { id: 2, name: "Last Month", unavailable: false },
  { id: 3, name: "Last Year", unavailable: false },
];

const DateRangeFilter = () => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative py-2 pl-3 text-left cursor-default focus:outline-none ">
            <span className="absolute inset-y-0 flex items-center pr-2 pointer-events-none -left-3 top-2">
              <HiChevronDown
                className="w-5 h-5 text-darkgray"
                aria-hidden="true"
              />
            </span>
            <span className="text-base font-medium font-primary text-darkgry text-darkgray">
              {selected.name}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 py-1 overflow-auto text-base bg-white rounded-lg">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-green bg-opacity-10 text-green"
                        : "text-darkgray"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green">
                          <HiOutlineCheck
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DateRangeFilter;
