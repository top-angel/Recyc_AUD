import { Formik, FormikProps, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import TextField from "../TextField/TextField";
import router from "next/router";

export interface Values {
  name: string;
  address: string;
}

const dataSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Required"),
  address: Yup.string().min(2, "Too Short!").required("Required"),
});

type props = {
  submit: (values: Values) => void;
  setSelectedIndex: (index: number) => void;
};

function StorerQuery({ submit, setSelectedIndex }: props) {
  const [inputValue, setInputValue] = useState("");

  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const button = document.getElementById(
      "approve"
    ) as HTMLButtonElement | null;
    if (username.length < 2 || address.length < 2) {
      if (button != null) button.disabled = true;
      button?.classList.replace("bg-primary", "bg-darkgray");
    } else {
      if (button != null) button.disabled = false;
      button?.classList.replace("bg-darkgray", "bg-primary");
    }
  }, [username, address]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const handleApprove = () => {
    if (username.length >= 3 && address.length >= 3)
      router.push(`/storer/approved/Mo's Garage`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between w-full">
        <div className="mb-6 text-lg font-semibold text-left">
          Storer Application Details
        </div>
        <div className="text-xs">11.07.2023</div>
      </div>

      <Formik
        initialValues={{
          name: "",
          address: "",
        }}
        validationSchema={dataSchema}
        onSubmit={(values, actions) => {
          submit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props: FormikProps<Values>) => (
          <Form className="">
            <div className="w-full mt-5">
              <div className="w-full text-sm text-left">Full Name</div>
              <TextField
                name="name"
                type="name"
                label=""
                setValue={setUserName}
                className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                placeholder="Robin Lehman"
              />
            </div>

            <div className="w-full mt-8">
              <div className="w-full text-sm text-left">Storage Location</div>
              <TextField
                name="address"
                type="address"
                label=""
                setValue={setAddress}
                className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                placeholder="Annie M.G. Schmidtplein 14, 8083NZ, Rotterdam"
              />
            </div>

            <div className="w-full mt-5">
              <div className="w-full text-sm text-left">
                Opening Hours & Description
              </div>
              <textarea
                placeholder={`10.00 - 17.00 Weekdays \n Closed on Weekends \n\n Please bring your items through the front door :)`}
                rows={9}
                className="w-full px-3 py-2 mt-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              ></textarea>
            </div>
            <div className="w-full mt-5">
              <div className="w-full text-sm text-left">Storage Space</div>
              <input
                type="text"
                placeholder="700m3"
                className="w-full px-3 py-2 mt-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              ></input>
            </div>
            <div className="flex flex-row justify-between w-full mt-5">
              <button
                // type="submit"
                id="approve"
                onClick={() => handleApprove()}
                className="w-4/5 px-3 py-2 mt-3 text-sm text-center text-white rounded-md bg-primary outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              >
                Approve User
              </button>
              <button
                className="w-1/6 px-3 py-2 mt-3 text-sm text-center text-white rounded-md bg-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                onClick={() => handleSelect(2)}
              >
                Decline
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StorerQuery;
