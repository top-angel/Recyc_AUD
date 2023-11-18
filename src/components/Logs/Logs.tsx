import React, { useEffect, useState } from "react";
import ScanedLog from "./ScanedLog";
import StoredLog from "./StoredLog";
import ReturnedLog from "./ReturnedLog";
import { Tab } from "@headlessui/react";
import CustomTab from "../CustomTab/CustomTab";

interface LogData {
  title: string;
  company: string;
  date: string;
  imageUrl: string;
}

interface ScanedLogData extends LogData {
  scanCount: number;
}

interface StoredLogData extends LogData {
  storeCount: number;
  userImage: string;
  userName: string;
  userAddress: string;
}

interface ReturnedLogData extends LogData {
  returnedCount: number;
  price: string;
}

export interface LogList {
  scanned_list?: ScanedLogData[];
  stored_list?: StoredLogData[];
  returned_list?: ReturnedLogData[];
}

type LogsProps = {
  logData: LogList;
  type: "collector" | "creator" | "storer";
  headerData?: string;
};

const myHeaderData = ["Scanned(538)", "Stored(138)", "Returned(71)"];

function Logs({ logData, type, headerData }: LogsProps) {
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
        <CustomTab headers={myHeaderData}>
          <Tab.Panels>
            <Tab.Panel key={0}>
              <div className="block logTag">
                <div className="flex flex-col overflow-auto h-panel">
                  {logData?.scanned_list &&
                    logData?.scanned_list.map((data1, index) => {
                      return (
                        <ScanedLog
                          key={index}
                          type={type}
                          title={data1.title}
                          scanCount={data1.scanCount}
                          company={data1.company}
                          date={data1.date}
                          imageUrl={data1.imageUrl}
                        />
                      );
                    })}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel key={1}>
              <div className="block logTag">
                <div className="flex flex-col overflow-auto h-panel">
                  {logData?.stored_list &&
                    logData?.stored_list.map((data1, index) => {
                      return (
                        <StoredLog
                          key={index}
                          type={type}
                          title={data1.title}
                          storeCount={data1.storeCount}
                          company={data1.company}
                          date={data1.date}
                          imageUrl={data1.imageUrl}
                          userImage={data1.userImage}
                          userName={data1.userName}
                          userAddress={data1.userAddress}
                        />
                      );
                    })}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel key={2}>
              <div className="block logTag">
                <div className="flex flex-col overflow-auto h-panel">
                  {logData?.returned_list &&
                    logData?.returned_list.map((data1, index) => {
                      return (
                        <ReturnedLog
                          key={index}
                          type={type}
                          title={data1.title}
                          returnedCount={data1.returnedCount}
                          company={data1.company}
                          date={data1.date}
                          imageUrl={data1.imageUrl}
                          price={data1.price}
                        />
                      );
                    })}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </CustomTab>
      </div>
    </div>
  );
}

export default Logs;
