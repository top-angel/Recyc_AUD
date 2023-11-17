import React from "react";
import MissionLog from "./MissionLog";
import { Tab } from "@headlessui/react";
import CustomTab from "../CustomTab/CustomTab";
import { myMissionData } from "../../utils/MissionData";
import { type } from "os";

const myHeaderData = ["Queued", "Ongoing", "Finished"];

interface MissionData {
  title: string;
  company: string;
  amount: number;
  imageUrl: string;
}

interface EarningsProps {
  headerData?: string[];
  missionData?: MissionData[]; // Define the data prop
  missiontype?: string;
  type: string;
}

function Missions({
  missionData = myMissionData,
  headerData = myHeaderData,
  missiontype = "collector",
}: EarningsProps) {
  return (
    <div className="flex flex-col w-full p-5 rounded-lg bg-gray">
      <div className="flex flex-row justify-between w-full text-darkgray">
        <div className="text-lg font-semibold font-primary">Missions</div>
        <div className="text-xs font-normal font-primary">
          {missionData.length} Missions
        </div>
      </div>
      <div className={`mt-4 h-[690px]`}>
        <CustomTab headers={headerData}>
          <Tab.Panels>
            <Tab.Panel
              className={`text-center font-primary text-sm font-light text-darkgray`}
            ></Tab.Panel>
            <Tab.Panel>
              <div
                className={`flex flex-col overflow-auto ${
                  headerData[0] != "" ? "h-[630px]" : "mt-[-30px] h-[680px]"
                }`}
              >
                {missionData && (
                  <>
                    {missionData.map((item, index) => {
                      return (
                        <MissionLog
                          key={index}
                          type={missiontype}
                          title={item.title}
                          company={item.company}
                          amount={item.amount}
                          imageUrl={item.imageUrl}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={`text-center font-primary text-sm font-light text-darkgray`}
            ></Tab.Panel>
          </Tab.Panels>
        </CustomTab>
      </div>
      {/* </Tab.Group> */}
    </div>
  );
}

export default Missions;
