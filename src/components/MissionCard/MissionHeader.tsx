import React, { useState } from "react";
import { BiSolidUser, BiHome, BiBuildingHouse } from "react-icons/bi";
import Image from "next/image";
import router from "next/router";

function MissionHeader() {
  const onClickBack = () => {
    router.back();
  };
  return (
    <div className="flex flex-row justify-between w-full px-8 font-primary">
      <div className="flex flex-row items-center">
        <div
          className="px-3 py-1 mr-4 rounded-md text-18 bg-gray text-darkgray hover:cursor-pointer"
          onClick={onClickBack}
        >{`<`}</div>
        <div className="text-lg font-bold font-primary text-darkgray">
          330ml Cans
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row items-center mr-4">
          <div className="text-sm font-normal font-primary text-darkgray">
            Coca-Cola
          </div>
          <Image
            src="/assets/images/coca-cola.svg"
            alt="logo"
            width="29"
            height="29"
          />
          <div className="text-sm font-normal font-primary text-darkgray">
            · Worldwide
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 p-2 text-xs font-semibold rounded-xl bg-purple bg-opacity-20 font-primary text-purple hover:cursor-pointer">
          +12345
          <BiSolidUser size={16} color="#828CC1" />
        </div>
        <div className="flex flex-row items-center gap-1 p-2 mx-4 text-xs font-semibold rounded-xl bg-green bg-opacity-20 font-primary text-green hover:cursor-pointer">
          +2134
          <BiHome size={16} color="#47A8AB" />
        </div>
        <div className="flex flex-row items-center gap-1 p-2 text-xs font-semibold text-blue-300 bg-blue-300 rounded-xl bg-opacity-20 font-primary hover:cursor-pointer">
          +63
          <BiBuildingHouse size={16} color="blue-300" />
        </div>
      </div>
    </div>
  );
}

export default MissionHeader;
