import Image from "next/image";
import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";

import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { userActions } from "src/redux/user/userSlice";

type props = {
  logout: () => void;
};

const Header = ({ logout }: props) => {
  const dispatch = useDispatch();
  const handleCreatorsClick = () => {
    localStorage.setItem("approvedStatus", "main");
    dispatch(userActions.setCreateBounty({}));
  };
  return (
    <div className="fixed mx-auto flex w-full items-center justify-between bg-white p-7">
      <div className="flex w-1/2 items-center gap-8">
        <Link
          href="/"
          className="flex items-center justify-center font-primary hover:border-0 "
        >
          <div className="h-9 w-9">
            <Image
              src={"/assets/images/logo.svg"}
              alt="logo"
              width={36}
              height={36}
              unoptimized
            />
          </div>
        </Link>

        <SearchBar />
        <Link
          href="/collectors"
          className="font-primary text-darkgray hover:border-0 hover:text-primary"
        >
          Collectors
        </Link>
        <Link
          href="/storers"
          className="font-primary text-darkgray hover:border-0 hover:text-primary"
        >
          Storers
        </Link>
        <Link
          href="/creators"
          className="font-primary text-darkgray hover:border-0 hover:text-primary"
          onClick={handleCreatorsClick}
        >
          Creators
        </Link>
        <Link
          href="/components"
          className="font-primary text-darkgray hover:border-0 hover:text-primary"
        >
          Components
        </Link>
      </div>
      <div className="flex gap-5 text-darkgray">
        <IoSettingsOutline className="text-xl" onClick={logout} />
        <IoNotificationsOutline className="text-xl" />
      </div>
    </div>
  );
};

export default Header;
