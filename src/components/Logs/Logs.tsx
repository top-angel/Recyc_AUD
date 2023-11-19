import React, { useEffect, useState } from "react";
import ScanedLog from "./ScanedLog";
import StoredLog from "./StoredLog";
import ReturnedLog from "./ReturnedLog";
import { Tab } from "@headlessui/react";
import CustomTab from "../CustomTab/CustomTab";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type LogsProps = {
  type: "collector" | "creator" | "storer";
  headerData?: string[];
};

type logsDetailsDataProps = {
  _id: string,
  _rev: string,
  company_name: string,
  created_at: string,
  description: string,
  entity_list_type: string,
  entity_type: string,
  favorites_of: [],
  image: string,
  log_name: string,
  name: string,
  number_of_scans: number,
  profile_image: any,
  public_address: string,
  qr_code: string,
  type: "Scanned" | "Stored" | "Returned",
  updated_at: string,
}

const myHeaderData = ["Scanned (538)", "Stored(138)", "Returned(71)"];

function Logs({ type, headerData = myHeaderData }: LogsProps) {
  const { aggregatedDetailsData } = useAppSelector((s) => ({
    aggregatedDetailsData: s.user.aggregatedDetailsData,
  }));
  const logsDetailsData: logsDetailsDataProps[] = aggregatedDetailsData?.logs?.scanned_list;
  

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
            {logsDetailsData.map((item: any, index) => {
              if (!(index == 0 && headerData.length == 2)) {
                return (
                  <Tab.Panel key={index}>
                    <div className="block logTag">
                      <div className="flex flex-col overflow-auto h-panel">
                        {item.type == "Scanned" && (
                          <ScanedLog
                            key={index}
                            type={item.type}
                            title={item.log_name}
                            scanCount={item.number_of_scans}
                            company={item.company_name}
                            date={item.created_at}
                            imageUrl={item.image}
                          />
                          )}
                        {item.type == "Stored" && (
                           <StoredLog
                            key={index}
                            type={item.type}
                            title={item.log_name}
                            storeCount={item.number_of_scans}
                            company={item.company_name}
                            date={item.created_at}
                            imageUrl={item.image}
                            userImage={item.profile_image?.company_image}
                            userName={item.name}
                            userAddress={item.public_address}
                          />
                          )}
                        {item.type == "Returned" && (
                           <ReturnedLog
                            key={index}
                            type={item.type}
                            title={item.log_name}
                            returnedCount={item.number_of_scans}
                            company={item.company_name}
                            date={item.created_at}
                            imageUrl={item.image}
                            price={""}
                          />
                          )}
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
