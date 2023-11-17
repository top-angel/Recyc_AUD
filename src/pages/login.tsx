import React from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userActions } from "../redux/user/userSlice";
import { usePrivy } from "@privy-io/react-auth";

// import { Values } from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { login, ready, authenticated, user } = usePrivy();

  // const submit = (values: Values) => {
  //   if (values.email === "test@test.com" && values.password === "test") {
  //     dispatch(userActions.authenticate({ token: "" }));
  //     router.push("/");
  //   }
  // };

  if (!ready) {
    return <></>;
  }

  if (ready && authenticated) {
    dispatch(userActions.authenticate(user));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray">
      <div className="">
        <LoginForm onClick={login} />
      </div>
    </div>
  );
};

export default LoginPage;
