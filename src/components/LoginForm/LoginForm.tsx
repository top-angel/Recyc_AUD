import React, { useEffect } from "react";

import Image from "next/image";
import Button from "../Button/Button";
import { useAuthContext } from "../../context/AuthProvider";
import { deleteCookie } from "src/utils/cookies";

export interface Values {
  email: string;
  password: string;
}

type props = {
  onClick: () => void;
};

const LoginForm = ({ onClick }: props) => {
  const { loading, roles } = useAuthContext();

  useEffect(() => {
    deleteCookie("roles");
  }, []);

  console.log(roles);

  return (
    <div className="p-10 bg-white border-2 rounded-2xl border-gray">
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
          className="inline-flex items-center justify-center mt-10 text-white rounded-xl bg-primary font-primary"
        >
          Login
        </Button>
      )}
      {loading && (
        <Button
          type="button"
          onClick={onClick}
          className="inline-flex items-center justify-center mt-10 text-white rounded-xl bg-primary font-primary"
        >
          {loadingSpinner} Loading...
        </Button>
      )}
      {roles !== "" && roles === "admin" && (
        <div className="text-sm text-rose-500">
          You are not a Recyclium Admin.
          {/* <br /> Please contact us to change that from the email
          <br /> you used to log in - recyclium@dataunion.app */}
        </div>
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
