import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface EachItem {
  type: "collector" | "creator" | "storer";
  title: string;
  returnedCount: number;
  imageUrl: string;
  company: string;
  date: string;
  price: string;
}

function ReturnedLog(props: EachItem) {
  return (
    <Link
      href={`/${
        props.type ? props.type : "collector"
      }/details/${encodeURIComponent(props.title)}`}
      className="hover:border-none"
    >
      <div className="flex flex-col p-2 my-3 rounded-xl bg-lightwhite">
        <div className="flex flex-row gap-3 pb-3">
          <div className="flex items-center w-itemImageSize">
            <Image
              src={`/assets/images/${props.imageUrl}`}
              alt="logo"
              width="29"
              height="29"
            />
          </div>
          <div className="flex flex-col w-full gap-3 text-darkgray">
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold font-primary">
                {props.title}
              </div>
              <div className="text-sm font-light font-primary">
                {props.returnedCount} Stored
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm font-light font-primary">
                {props.company}
              </div>
              <div className="text-sm font-light font-primary">
                {props.date}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-2 text-base font-medium border-t border-darkestgray font-primary text-lightgreen">
          Rewards allocated: ${props.price}
        </div>
      </div>
    </Link>
  );
}

export default ReturnedLog;
