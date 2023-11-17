import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Combobox, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "next/image";
import MainDiscussion from "../MainDiscussion/MainDiscussion";
import { groupBy } from "../../utils/utils";
import classNames from "classnames";
import { userActions } from "../../redux/user/userSlice";

type SlideProps = {
  type: "Collector" | "Mission Creator" | "Storer";
  verified?: boolean;
  avatar: string;
  title: string;
  totalRewarded?: number;
  totalEarned?: number;
  incident?: number;
  successRate?: number;
  scanned?: number;
  stored?: number;
  returned?: number;
  missions?: number;
  address?: string;
  className?: string;
  onClose: () => void;
};

const ChatSlide: React.FC<SlideProps> = ({
  type,
  verified,
  avatar,
  title,
  totalRewarded,
  totalEarned,
  incident,
  successRate,
  scanned,
  stored,
  returned,
  missions,
  address,
  className,
  onClose,
}) => {
  const [selectedPerson, setSelectedPerson] = useState();
  const [query, setQuery] = useState("");

  const [messages, setMessages] = useState<
    { content: string; sender: string }[]
  >([]);

  const handleSubmitMessage = (message: string) => {
    setMessages([...messages, { content: message, sender: "You" }]);
  };

  const { chatselectedUser } = useAppSelector((s) => ({
    chatselectedUser: s.user.chatselectedUser,
  }));

  const dispatch = useAppDispatch();

  const handlePersonClick = (person: any, id: number) => {
    dispatch(userActions.setChatSelectedUser(person));
  };

  const { fetchAllUsers } = useAppSelector((s) => ({
    fetchAllUsers: s.user.fetchAllUsers.user,
  }));

  const filteredPeople =
    query === ""
      ? fetchAllUsers
      : fetchAllUsers !== undefined
      ? fetchAllUsers.filter((person: any) => {
          const name = person.public_address;
          return name.toLowerCase().includes(query.toLowerCase());
        })
      : null;

  const groupedPeople = filteredPeople
    ? groupBy(filteredPeople, "claims")
    : null;

  const _renderOptions = (group: string) =>
    groupedPeople[group].map((person: any, key: number) => {
      return (
        <Combobox.Option
          key={key}
          value={person}
          onClick={() => handlePersonClick(person, key)}
          className={classNames(
            `flex items-center justify-between px-10 py-2.5`,
            key % 2 === 0 ? "bg-lightgray" : ""
          )}
        >
          <div className="flex items-center gap-3 font-primary text-xs text-darkgray">
            <Image
              src="/assets/images/mo-garage.png" /* will add avatar after backend return the link */
              alt="image"
              width={36}
              height={36}
              unoptimized
              className="rounded-full outline outline-2 outline-purple"
            />
            {person.public_address}
          </div>
          <div className="flex gap-4">
            <div className="rounded-full bg-purple bg-opacity-20 px-2 py-1 text-xs text-purple">
              +{person.scanned_count} Scanned
            </div>
          </div>
        </Combobox.Option>
      );
    });

  return (
    <div className="fixed right-0 top-0 h-full w-[567px] translate-x-0 transform border border-solid border-darkestgray bg-white transition-transform duration-500">
      <div className="relative h-full">
        <div className=" bg-darkestpurple bg-opacity-10 p-6">
          <div className="flex">
            <div className="w-full ">
              <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                {({ open }) => (
                  <>
                    <div className="relative w-full">
                      <IoSearch className="absolute left-3 top-2 text-xl text-black opacity-50" />
                      <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person: any) => person.public_address}
                        className="w-full rounded-3xl bg-white py-2 pl-10 pr-5 font-primary text-xs font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                      />
                    </div>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                      className="absolute inset-x-0 top-20 z-[20] w-full bg-white"
                    >
                      <Combobox.Options className="shadow-sm">
                        {groupedPeople &&
                          Object.keys(groupedPeople).map(
                            (group: any, key: number) => {
                              return (
                                <>
                                  <div
                                    className={classNames(
                                      "bg-opacity-20 px-10 font-primary text-sm capitalize text-darkgray",
                                      key === 0
                                        ? "bg-purple "
                                        : key === 1
                                        ? "bg-green"
                                        : "bg-transpurple"
                                    )}
                                  >
                                    {group}
                                  </div>
                                  {_renderOptions(group)}
                                </>
                              );
                            }
                          )}
                        <div className="py-2 text-center text-darkgray">
                          {filteredPeople?.length} Results found
                        </div>
                      </Combobox.Options>
                    </Transition>
                  </>
                )}
              </Combobox>
            </div>
            <div
              className="ml-2 cursor-pointer rounded-xl bg-white px-3 py-2"
              onClick={onClose}
            >
              <Image
                src={"/assets/images/close-slide.svg"}
                alt="close"
                width={9}
                height={18}
                unoptimized
              />
            </div>
          </div>
          {chatselectedUser ? (
            <>
              <div className="mt-6 flex justify-between">
                <div className="flex items-center gap-4 font-primary text-lg font-semibold text-darkgray">
                  <Image
                    src="/assets/images/mo-garage.png"
                    alt="image"
                    width={28}
                    height={28}
                    unoptimized
                    className="rounded-full outline outline-2 outline-purple"
                  />
                  {chatselectedUser._id}
                </div>
                <div className="text-xs font-normal text-darkgray">
                  {chatselectedUser.claims}
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <div className="flex items-center gap-3">
                  {chatselectedUser.scanned_count != undefined && (
                    <div className="rounded-full bg-purple bg-opacity-20 px-2 py-1 text-xs font-normal text-purple">
                      +{chatselectedUser.scanned_count} Scanned
                    </div>
                  )}
                  {chatselectedUser.stored_count != undefined && (
                    <div className="rounded-full bg-green bg-opacity-20 px-2 py-1 text-xs font-normal text-green">
                      +{chatselectedUser.stored_count} Stored
                    </div>
                  )}
                  {chatselectedUser.returned_count != undefined && (
                    <div className="rounded-full bg-darkestpurple bg-opacity-20 px-2 py-1 text-xs font-normal text-darkestpurple">
                      +{chatselectedUser.returned_count} Returned
                    </div>
                  )}
                </div>
                <div className="mb-auto mt-auto text-xs font-normal text-darkgray">
                  +{222} Missions
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-6 flex justify-between">
                <div className="flex items-center gap-4 font-primary text-lg font-semibold text-darkgray">
                  <Image
                    src={avatar}
                    alt="image"
                    width={28}
                    height={28}
                    unoptimized
                    className="rounded-full outline outline-2 outline-purple"
                  />
                  {title}
                </div>
                <div className="text-xs font-normal text-darkgray">{type}</div>
              </div>
              <div className="mt-6 flex justify-between">
                <div className="flex items-center gap-3">
                  {scanned != undefined && (
                    <div className="rounded-full bg-purple bg-opacity-20 px-2 py-1 text-xs font-normal text-purple">
                      +{scanned} Scanned
                    </div>
                  )}
                  {stored != undefined && (
                    <div className="rounded-full bg-green bg-opacity-20 px-2 py-1 text-xs font-normal text-green">
                      +{stored} Stored
                    </div>
                  )}
                  {returned != undefined && (
                    <div className="rounded-full bg-darkestpurple bg-opacity-20 px-2 py-1 text-xs font-normal text-darkestpurple">
                      +{returned} Returned
                    </div>
                  )}
                </div>
                {missions && (
                  <div className="mb-auto mt-auto text-xs font-normal text-darkgray">
                    +{missions} Missions
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="absolute top-30 w-full">
          <MainDiscussion accountId={chatselectedUser.public_address} />
        </div>
      </div>
    </div>
  );
};

export default ChatSlide;
