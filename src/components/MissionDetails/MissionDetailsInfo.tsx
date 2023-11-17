import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from "./ImageUploader/ImageUploader";
import MultipleUploader from "./MultipleUploader/MultipleUploader";
import { userActions } from "src/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppSelector } from "src/redux/hooks";

interface MissionDetailsInfoProps {
  onDeclineClick: () => void;
  onApproveClick: () => void;
}

interface FormValues {
  missionTitle: string;
  companyTitle: string;
  materialType: string;
  materialSize: number | "";
  missionDescription: string;
  amountOfItems: number | "";
  totalRewards: number | "";
  location: string;
  startDate: Date;
  endDate: Date;
  missionImage: string;
  examplePicture: string[];
}

const validationSchema = Yup.object().shape({
  missionTitle: Yup.string().required("Mission Title Required"),
  companyTitle: Yup.string().required("Company Title Required"),
  materialType: Yup.string().required("Material Type Required"),
  materialSize: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  amountOfItems: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  totalRewards: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  location: Yup.string().required("Location Required"),
});

const MissionDetailsInfo = ({
  onDeclineClick,
  onApproveClick,
}: MissionDetailsInfoProps) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure double-digit day
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
  const year = currentDate.getFullYear().toString();

  const formattedDate = `${day}.${month}.${year}`;

  useEffect(() => {
    const datePickerWrappers: any = document.querySelectorAll(
      ".react-datepicker-wrapper",
    );

    datePickerWrappers.forEach((datePickerWrapper: any) => {
      datePickerWrapper.style.setProperty("width", "100%", "important");
    });
  }, []);

  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const [submitData, setSubmitData] = useState<any>();

  const { createBounty } = useAppSelector((s) => ({
    createBounty: s.user.createBounty,
  }));

  useEffect(() => {
    if (Object.keys(createBounty).length != 0) {
      onApproveClick();
    }
  }, [createBounty]);

  useEffect(() => {
    if (submitData && accessToken) {
      dispatch(
        userActions.createBounty({
          accessToken: accessToken,
          formData: submitData,
        }),
      );
    }
  }, [submitData]);

  return (
    <Formik
      initialValues={{
        missionTitle: "",
        companyTitle: "",
        materialType: "",
        materialSize: "",
        missionDescription: "",
        amountOfItems: "",
        totalRewards: "",
        location: "",
        startDate: currentDate,
        endDate: currentDate,
        missionImage: "",
        examplePicture: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {
        if (values.missionImage == "") {
          alert("Please upload mission image.");
        } else if (values.examplePicture.length == 0) {
          alert("Please add example picture.");
        } else {
          const currentDate = new Date();
          currentDate.setMinutes(currentDate.getMinutes() - 30);
          if (values.startDate < currentDate) {
            alert("Start date should be current date or later.");
          } else if (values.endDate <= values.startDate) {
            alert("End date should be later than the start date.");
          } else {
            const imageRequirements = {
              materialType: values.materialType,
              materialSize: values.materialSize,
              materialNumber: "",
              totalRewards: values.totalRewards,
            };
            const formData = new FormData();
            formData.append("company_name", values.companyTitle);
            formData.append("company_description", values.location);
            formData.append("bounty_type", "upload");
            formData.append("bounty_description", values.missionDescription);
            formData.append("start_date", values.startDate.toISOString());
            formData.append("end_date", values.endDate.toISOString());
            formData.append("bounty_image", values.missionImage);
            formData.append("image_count", values.amountOfItems.toString());
            formData.append("image_format", "png,jpeg");
            formData.append("bounty_name", "");
            formData.append("company_image", values.missionImage);
            formData.append(
              "image_requirements",
              JSON.stringify(imageRequirements),
            );
            formData.append("entity_list_name", values.missionTitle);
            setSubmitData(formData);
          }
        }
      }}
    >
      {({ values, touched, isValid, setFieldValue, errors }) => (
        <Form>
          <div className="mx-auto flex w-full flex-col rounded-lg bg-gray p-6 shadow">
            <div className="flex justify-between">
              <div className="mb-6 text-left font-primary text-lg font-semibold text-darkgray">
                Mission Application Details
              </div>
              <div className="mb-6 font-primary text-xs font-normal text-darkgray">
                {formattedDate}
              </div>
            </div>
            <div className="flex">
              <div className="mr-6 w-full">
                <ImageUploader
                  className="h-[204px]"
                  onImageUpload={(imageFile: File) =>
                    setFieldValue("missionImage", imageFile)
                  }
                />
                <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                  Mission Title
                </div>
                <Field
                  type="text"
                  name="missionTitle"
                  placeholder="330ml Cans"
                  className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
                {touched.missionTitle && errors.missionTitle ? (
                  <ErrorMessage
                    name="missionTitle"
                    component="div"
                    className="font-primary text-xs font-light text-red"
                  />
                ) : (
                  <div className="font-primary text-xs font-light text-primary">
                    Mission Title Confirmed
                  </div>
                )}

                <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                  Company Title
                </div>
                <Field
                  type="text"
                  name="companyTitle"
                  placeholder="Coca-Cola"
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
                    Company Title Confirmed
                  </div>
                )}

                <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                  Material Type
                </div>
                <Field
                  type="text"
                  name="materialType"
                  placeholder="Tin"
                  className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
                {touched.materialType && errors.materialType ? (
                  <ErrorMessage
                    name="materialType"
                    component="div"
                    className="font-primary text-xs font-light text-red"
                  />
                ) : (
                  <div className="font-primary text-xs font-light text-primary">
                    Material Type Confirmed
                  </div>
                )}
                <div className="flex">
                  <div className="mr-2 w-full">
                    <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                      Material Size
                    </div>
                    <Field
                      type="number"
                      name="materialSize"
                      placeholder="330"
                      className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    {touched.materialSize && errors.materialSize ? (
                      <ErrorMessage
                        name="materialSize"
                        component="div"
                        className="font-primary text-xs font-light text-red"
                      />
                    ) : (
                      <div className="font-primary text-xs font-light text-primary">
                        Material Size Confirmed
                      </div>
                    )}
                  </div>
                  <div className="ml-2 mt-12 h-9 w-[52px] rounded-xl bg-white px-3 py-2 text-center text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary">
                    ml
                  </div>
                </div>
              </div>
              <div className="w-full border-l border-darkgray pl-6">
                <div className="font-primary text-sm font-normal text-darkgray">
                  Mission Description
                </div>
                <Field
                  as="textarea"
                  name="missionDescription"
                  placeholder="Our goal is to collect and recycle as many 330ml Coca Cola cans as possible to promote sustainable practices and reduce waste. By participating in this mission, you'll contribute to the conservation of valuable resources and protect the environment from unnecessary pollution."
                  className="mb-1 mt-1 h-[92px] w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />

                <div className="flex">
                  <div className="mr-2 w-full">
                    <div className="mt-4 font-primary text-sm font-normal text-darkgray">
                      Amount of Items
                    </div>
                    <Field
                      type="number"
                      name="amountOfItems"
                      placeholder="4,000,000"
                      className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    {touched.amountOfItems && errors.amountOfItems ? (
                      <ErrorMessage
                        name="amountOfItems"
                        component="div"
                        className="font-primary text-xs font-light text-red"
                      />
                    ) : (
                      <div className="font-primary text-xs font-light text-primary">
                        Amount of Items Confirmed
                      </div>
                    )}
                  </div>
                  <div className="ml-2 mr-2 w-full">
                    <div className="mt-4 font-primary text-sm font-normal text-darkgray">
                      Total Rewards to be allocated
                    </div>
                    <Field
                      type="number"
                      name="totalRewards"
                      placeholder="2,000,000 USD"
                      className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    {touched.totalRewards && errors.totalRewards ? (
                      <ErrorMessage
                        name="totalRewards"
                        component="div"
                        className="font-primary text-xs font-light text-red"
                      />
                    ) : (
                      <div className="font-primary text-xs font-light text-primary">
                        Allocated Rewards Confirmed
                      </div>
                    )}
                  </div>
                  <div className="ml-2 mt-11 min-w-[100px] text-sm font-normal text-darkgray">
                    = 0.5$ per item
                  </div>
                </div>

                <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                  Location
                </div>
                <Field
                  type="text"
                  name="location"
                  placeholder="Worldwide"
                  className="mb-1 mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
                {touched.location && errors.location ? (
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="font-primary text-xs font-light text-red"
                  />
                ) : (
                  <div className="font-primary text-xs font-light text-primary">
                    Location Confirmed
                  </div>
                )}

                <div className="flex justify-between">
                  <div className="mr-2 w-full">
                    <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                      Start Date
                    </div>
                    <DatePicker
                      selected={values.startDate}
                      onChange={(date) => setFieldValue("startDate", date)}
                      placeholderText="25/06/2023"
                      className="mb-1 mt-1 flex w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    <div className="font-primary text-xs font-light text-primary">
                      Start Date Confirmed
                    </div>
                  </div>
                  <div className="ml-2 w-full">
                    <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                      End Date
                    </div>
                    <DatePicker
                      selected={values.endDate}
                      onChange={(date) => setFieldValue("endDate", date)}
                      placeholderText="N/A"
                      className="mb-1 mt-1 flex w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    <div className="font-primary text-xs font-light text-primary">
                      End Date Confirmed
                    </div>
                  </div>
                </div>

                <div className="mt-6 font-primary text-sm font-normal text-darkgray">
                  Example Pictures
                </div>
                <MultipleUploader
                  setExamplePicture={(imageNames) =>
                    setFieldValue("examplePicture", imageNames)
                  }
                />
                <div className="flex">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="mr-3 mt-6 w-5/6 rounded-xl bg-primary px-4 py-2.5 font-primary text-base font-medium text-white"
                  >
                    Approve Mission
                  </button>
                  <button
                    onClick={onDeclineClick}
                    className="ml-3 mt-6 w-1/6 rounded-xl bg-darkgray px-4 py-2.5 font-primary text-base font-medium text-white"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MissionDetailsInfo;
