import React, { useEffect, useState } from "react";
import ScanedLog from "./ScanedLog";
import StoredLog from "./StoredLog";
import ReturnedLog from "./ReturnedLog";
import { Tab } from "@headlessui/react";
import { logsData } from "../../utils/LogsData";
import CustomTab from "../CustomTab/CustomTab";

type LogsProps = {
  type: "collector" | "creator" | "storer";
  headerData?: string[];
};

const myHeaderData = ["Scanned (538)", "Stored(138)", "Returned(71)"];

function Logs({ type, headerData = myHeaderData }: LogsProps) {
  return (
    <div className="flex flex-col p-5 rounded-xl bg-gray">
      <div className="flex flex-row justify-between w-full text-darkgray">
        <div className="text-lg font-semibold font-primary">Log</div>
        <div className="flex flex-row items-center">
          <div className="text-xs font-bold font-primary">%95&nbsp;</div>
          <div className="text-xs font-normal font-primary"> Success Rate</div>
        </div>
      </div>
      <div className="mt-4">
        <CustomTab headers={headerData}>
          <Tab.Panels>
            {logsData?.map((item, index) => {
              if (!(index == 0 && headerData.length == 2)) {
                return (
                  <Tab.Panel key={index}>
                    <div className="block logTag">
                      <div className="flex flex-col overflow-auto h-panel">
                        {item.scaned &&
                          item.scaned.map((data, index) => {
                            return (
                              <ScanedLog
                                key={index}
                                type={type}
                                title={data.title}
                                scanCount={data.scanCount}
                                company={data.company}
                                date={data.date}
                                imageUrl={data.imageUrl}
                              />
                            );
                          })}
                        {item.stored &&
                          item.stored.map((data, index) => {
                            return (
                              <StoredLog
                                key={index}
                                type={type}
                                title={data.title}
                                storeCount={data.storeCount}
                                company={data.company}
                                date={data.date}
                                imageUrl={data.imageUrl}
                                userImage={data.userImage}
                                userName={data.userName}
                                userAddress={data.userAddress}
                              />
                            );
                          })}
                        {item.returned &&
                          item.returned.map((data, index) => {
                            return (
                              <ReturnedLog
                                key={index}
                                type={type}
                                title={data.title}
                                returnedCount={data.returnedCount}
                                company={data.company}
                                date={data.date}
                                imageUrl={data.imageUrl}
                                price={data.price}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </Tab.Panel>
                );
              }
            })}
          </Tab.Panels>
        </CustomTab>
      </div>
    </div>
  );
}

export default Logs;
