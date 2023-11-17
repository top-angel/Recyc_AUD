import React, { useEffect } from "react";
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

interface MissionUnverifiedDetailsProps {
  onDeclineClick: () => void;
  onApproveClick: () => void;
}

interface FormValues {
  companyTitle: string;
  email: string;
  address: string;
  country: string;
  missionImage: string;
}

const validationSchema = Yup.object().shape({
  companyTitle: Yup.string().required("Company Title Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  address: Yup.string().required("Address Required"),
  country: Yup.string().required("Country Required"),
});

const MissionUnverifiedDetails = ({
  onDeclineClick,
  onApproveClick,
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

  const handleCreateProfile = ({values}: any) => {
    const id = "DjDtPsdgkI"; 
    const data = {
      email: values.email,
      company_title: values.companyTitle,
      address: values.address,
      country: values.country,
    };

    dispatch(userActions.createProfile({ accessToken, id, data }));
  };

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  useEffect(() => {
    console.log(createProfile)
    if (createProfile == true) {
      onApproveClick();
    }
  }, [createProfile])


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
              companyTitle: "",
              email: "",
              address: "",
              country: "",
              missionImage: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues) => {
              handleCreateProfile({values})
            }}
          >
            {({ values, touched, isValid, setFieldValue, errors }) => (
              <Form>
                <div className="mx-auto flex h-[769px] w-full flex-col rounded-lg bg-gray p-6 shadow">
                  <div className="flex justify-between">
                    <div className="mb-6 text-left font-primary text-lg font-semibold text-darkgray">
                      Mission Application Details
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
                      <Field
                        type="text"
                        name="companyTitle"
                        placeholder="Coca Cola"
                        className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                      />
                      {touched.companyTitle && errors.companyTitle ? (
                        <ErrorMessage
                          name="companyTitle"
                          component="div"
                          className="font-primary text-xs font-light text-red"
                        />
                      ) : (
                        <div className="font-primary text-xs font-light text-primary">
                          Name Confirmed
                        </div>
                      )}

                      <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                        Email
                      </div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="business@cocacola.com"
                        className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                      />
                      {touched.email && errors.email ? (
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="font-primary text-xs font-light text-red"
                        />
                      ) : (
                        <div className="font-primary text-xs font-light text-primary">
                          Email Confirmed
                        </div>
                      )}

                      <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                        Address
                      </div>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Gistelsteenweg 308, 8490 Jabbeke"
                        className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                      />
                      {touched.address && errors.address ? (
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="font-primary text-xs font-light text-red"
                        />
                      ) : (
                        <div className="font-primary text-xs font-light text-primary">
                          Adress Confirmed
                        </div>
                      )}
                      <div className="mr-2 w-full">
                        <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                          Country
                        </div>
                        <Field
                          type="text"
                          name="country"
                          placeholder="The Netherlands"
                          className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                        />
                        {touched.country && errors.country ? (
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="font-primary text-xs font-light text-red"
                          />
                        ) : (
                          <div className="font-primary text-xs font-light text-primary">
                            Country Confirmed
                          </div>
                        )}
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
