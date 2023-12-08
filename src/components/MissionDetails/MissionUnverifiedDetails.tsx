import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from "./ImageUploader/ImageUploader";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";
import { userActions } from "../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";
import TextField from "../TextField/TextField";

interface MissionUnverifiedDetailsProps {
  onDeclineClick: () => void;
  onApproveClick: () => void;
  missionData: any;
}

interface FormValues {
  companyTitle: string;
  companyEmail: string;
  companyAddress: string;
  companyCountry: string;
  missionImage: string;
}

const validationSchema = Yup.object().shape({
  companyTitle: Yup.string().required("Company Title Required"),
  companyEmail: Yup.string().email("Invalid email").required("Email Required"),
  companyAddress: Yup.string().required("Address Required"),
  companyCountry: Yup.string().required("Country Required"),
});

const MissionUnverifiedDetails = ({
  onDeclineClick,
  onApproveClick,
  missionData,
}: MissionUnverifiedDetailsProps) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure double-digit day
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
  const year = currentDate.getFullYear().toString();

  const formattedDate = `${day}.${month}.${year}`;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const datePickerWrappers: any = document.querySelectorAll(
      ".react-datepicker-wrapper",
    );

    datePickerWrappers.forEach((datePickerWrapper: any) => {
      datePickerWrapper.style.setProperty("width", "100%", "important");
    });
    dispatch(userActions.setCreateProfile(false));
  }, []);

 
  const { accessToken } = useAuthContext();

  const { isDataLoading, createProfile } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    createProfile: s.user.createProfile,
  }));

  const [companyTitle, setCompanyTitle] = useState(missionData?.profile?.company_title || "");
  const [companyEmail, setCompanyEmail] = useState(missionData?.profile?.email || "");
  const [companyAddress, setCompanyAddress] = useState(missionData?.profile?.address || "");
  const [companyCountry, setCompanyCountry] = useState(missionData?.profile?.country || "");

  const handleCreateProfile = async () => {
    try {
      const id = missionData?._id;
      const data = {
        email: companyEmail,
        company_title: companyTitle,
        address: companyAddress,
        country: companyCountry,
      };
      await dispatch(userActions.createProfile({ accessToken, id, data }));
  
      onApproveClick();
     
    } catch (error) {
      console.error("Error approve creating profile:", error);
    }
  };

  if (isDataLoading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-7">
        <div className="h-full w-1/3">
          <Missions type="creator" />
        </div>
        <div className="flex w-1/3 flex-col">
          <div className="w-full">
            <Incidents />
          </div>
          <div className="mt-4 w-full">
            <Earnings />
          </div>
        </div>
        <div className="w-1/2">
          <Formik
            initialValues={{
              companyTitle: companyTitle,
              companyEmail: companyEmail,
              companyAddress: companyAddress,
              companyCountry: companyCountry,
              missionImage: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues) => {
              handleCreateProfile();
            }}
          >
            {({ values, touched, isValid, setFieldValue, errors }) => (
              <Form>
                <div className="mx-auto flex h-[769px] w-full flex-col rounded-lg bg-gray p-6 shadow">
                  <div className="flex justify-between">
                    <div className="mb-6 text-left font-primary text-lg font-semibold text-darkgray">
                      Creator Application Details
                    </div>
                    <div className="mb-6 font-primary text-xs font-normal text-darkgray">
                      {formattedDate}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                      <ImageUploader
                        className="h-[166px]"
                        onImageUpload={(imageFile: File) =>
                          setFieldValue("missionImage", imageFile)
                        }
                      />
                      <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                        Company Title
                      </div>
                      <TextField
                        name="companyTitle"
                        type="text"
                        label=""
                        setValue={setCompanyTitle}
                        value={values.companyTitle}
                        className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                        placeholder="Coca Cola"
                      />
                      <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                        Email
                      </div>                      
                      <TextField
                        name="companyEmail"
                        type="text"
                        label=""
                        setValue={setCompanyEmail}
                        value={values.companyEmail}
                        className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                        placeholder="business@cocacola.com"
                      />

                      <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                        Address
                      </div>                     
                      <TextField
                        name="companyAddress"
                        type="text"
                        label=""
                        setValue={setCompanyAddress}
                        value={values.companyAddress}
                        className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                        placeholder="Gistelsteenweg 308, 8490 Jabbeke"
                      />

                      <div className="mr-2 w-full">
                        <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                          Country
                        </div>
                        <TextField
                          name="companyCountry"
                          type="text"
                          label=""
                          setValue={setCompanyCountry}
                          value={values.companyCountry}
                          className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                          placeholder="The Netherlands"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="mr-3 mt-6 w-5/6 rounded-xl bg-primary px-4 py-2.5 font-primary text-base font-medium text-white"
                    >
                      Approve User
                    </button>
                    <button
                      onClick={onDeclineClick}
                      className="ml-3 mt-6 w-1/6 rounded-xl bg-darkgray px-4 py-2.5 font-primary text-base font-medium text-white"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MissionUnverifiedDetails;
