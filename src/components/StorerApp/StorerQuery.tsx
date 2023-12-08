import { Formik, FormikProps, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import TextField from "../TextField/TextField";
import router from "next/router";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import LoadingSpinner from "../LoadSpinner/LoadSpinner";
import { userActions } from "src/redux/user/userSlice";

export interface Values {
  name: string;
  address: string;
}

const dataSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").required("Required"),
  // address: Yup.string().min(2, "Too Short!").required("Required"),
});

type props = {
  submit: (values: Values) => void;
  setSelectedIndex: (index: number) => void;
  storerQueryData: any;
};

function StorerQuery({ submit, setSelectedIndex, storerQueryData }: props) {

  // let newAddress = [storerQueryData?.profile?.address, storerQueryData?.profile?.city, storerQueryData?.profile?.country, storerQueryData?.profile?.postalCode]
  // .filter(value => value) 
  // .join(' '); 

  const [username, setUserName] = useState(storerQueryData?.profile?.name || "");
  const [address, setAddress] = useState(storerQueryData?.profile?.address || "");
  const [worktime, setWorkTime] = useState(storerQueryData?.profile?.worktime || "");
  const [storageSpace, setStorageSpace] = useState(storerQueryData?.profile?.storageSpace || "");

  const handleWorkTimeChange = (event) => {
    setWorkTime(event.target.value);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const dispatch = useAppDispatch();

  const { isDataLoading, approveStorer } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    approveStorer: s.user.approveStorer,
  }));

  const { accessToken } = useAuthContext();

  const handleApprove = async () => {
    try {
      const storerData = {
        name: storerQueryData?.profile?.name,
        address: storerQueryData?.profile?.address,
        geocode: {
          "lat": storerQueryData?.profile?.geocode?.lat,
          "lng": storerQueryData?.profile?.geocode?.lng
        },
        postalCode: storerQueryData?.profile?.postalCode,
        city: storerQueryData?.profile?.city,
        country: storerQueryData?.profile?.country,
        worktime: storerQueryData?.profile?.worktime,
        storageSpace: storerQueryData?.profile?.storageSpace
      };
  
      let mainId: any = storerQueryData._id;
      dispatch(userActions.setApproveStorer(false));
      await dispatch(userActions.approveStorerInfo({ id: mainId.toString(), token: accessToken, storerData: storerData }));
  
      router.push(`/storer/approved/${mainId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

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
                value={username}
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
                value={address}
                className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                placeholder="Annie M.G. Schmidtplein 14, 8083NZ, Rotterdam"
              />
            </div>

            <div className="w-full mt-5">
              <div className="w-full text-sm text-left">
                Opening Hours & Description
              </div>
              <textarea
                value={worktime}
                onChange={handleWorkTimeChange}
                placeholder={`10.00 - 17.00 Weekdays \n Closed on Weekends \n\n Please bring your items through the front door :)`}
                rows={9}
                className="w-full px-3 py-2 mt-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              ></textarea>
            </div>
            <div className="w-full mt-5">
              <div className="w-full text-sm text-left">Storage Space</div>
               <TextField
                name="storageSpace"
                type="text"
                label=""
                setValue={setStorageSpace}
                value={storageSpace}
                className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                placeholder="700m3"
              />
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
