import React from "react";
import MissionLog from "./MissionLog";
import { Tab } from "@headlessui/react";
import CustomTab from "../CustomTab/CustomTab";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

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

type MissionDetailsProps = {
  _id: string,
  bounty_id: string,
  company_name: string,
  mission_name: string,
  number_of_scans: number,
  profile_image: any,
  status: string,
  title: string,
}

function Missions({
  headerData = myHeaderData,
  missiontype = "collector",
}: EarningsProps) {

  const { aggregatedDetailsData } = useAppSelector((s) => ({
    aggregatedDetailsData: s.user.aggregatedDetailsData,
  }));
  const missionsDetailsData: MissionDetailsProps[] = aggregatedDetailsData?.missions;

  return (
    <div className="flex flex-col w-full p-5 rounded-lg bg-gray">
      <div className="flex flex-row justify-between w-full text-darkgray">
        <div className="text-lg font-semibold font-primary">Missions</div>
        <div className="text-xs font-normal font-primary">
          {missionsDetailsData?.length} Missions
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
                {missionsDetailsData && (
                  <>
                    {missionsDetailsData.map((item, index) => {
                      return (
                        <MissionLog
                          key={index}
                          type={missiontype}
                          title={item.mission_name}
                          company={item.company_name}
                          amount={item.number_of_scans}
                          imageUrl={item.profile_image}
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
