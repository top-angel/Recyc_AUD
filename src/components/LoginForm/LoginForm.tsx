import React from "react";

import Image from "next/image";
import Button from "../Button/Button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAuthContext } from "../../context/AuthProvider";

export interface Values {
  email: string;
  password: string;
}

type props = {
  onClick: () => void;
};

const LoginForm = ({ onClick }: props) => {
  const { user, authenticated } = usePrivy();
  const { accessToken, loading } = useAuthContext();

  return (
    <div className="rounded-2xl border-2 border-gray bg-white p-10">
      <div className="flex justify-center">
        <Image
          src={"/assets/images/textlogo.svg"}
          alt="logo"
          width="217"
          height="50"
        />
      </div>
      {!loading && (
        <Button
          type="button"
          onClick={onClick}
          className="mt-10 rounded-xl bg-primary font-primary text-white inline-flex items-center justify-center"
        >
          Login
        </Button>
      )}
      {loading && (
        <Button
          type="button"
          onClick={onClick}
          className="mt-10 rounded-xl bg-primary font-primary text-white inline-flex items-center justify-center"
        >
          {loadingSpinner} Loading...
        </Button>
      )}
    </div>
  );
};

const loadingSpinner = (
  <svg
    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default LoginForm;
