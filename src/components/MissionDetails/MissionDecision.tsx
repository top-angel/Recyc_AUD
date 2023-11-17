import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

interface MissionDecisionProps {
  onDeclineConfirmClick: () => void;
  onCancelClick: () => void;
}

interface FormValues {
  commentsDecision: string;
  commentsSend: string;
}

const validationSchema = Yup.object().shape({
  // will add if needed
});

const MissionDecision = ({
  onDeclineConfirmClick,
  onCancelClick,
}: MissionDecisionProps) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <Formik
      initialValues={{
        commentsDecision: "",
        commentsSend: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {
        onDeclineConfirmClick();
      }}
    >
      {({ isValid }) => (
        <Form>
          <div className="mx-auto w-full rounded-lg bg-gray p-6 shadow">
            <div className="flex justify-between">
              <div className="mb-4 text-left font-primary text-lg font-semibold text-darkgray">
                Mission Creator Application Details
              </div>
              <div className="mb-4 font-primary text-xs font-normal text-darkgray">
                {formattedDate}
              </div>
            </div>
            <div className="mb-2 font-primary text-sm font-normal text-darkgray">
              Comments About the Decision
            </div>
            <Field
              as="textarea"
              name="commentsDecision"
              placeholder={`· Reupload clearer Example Picturs, \n· Address could not be found in Google Maps`}
              className="h-[556px] w-full rounded-xl bg-white p-6 font-primary text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
            />
            <div className="relative w-full">
              <Field
                type="text"
                name="commentsSend"
                placeholder="Enter your Comments"
                className="mb-1 mt-6 w-full rounded-xl bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              />
              <div className="absolute right-3 top-8 hover:cursor-pointer">
                <Image
                  src={"/assets/images/sender-icon.svg"}
                  alt="senderLogo"
                  width="24"
                  height="24"
                />
              </div>
            </div>
            <div className="flex">
              <button
                onClick={onCancelClick}
                className="mr-3 mt-6 w-1/6 rounded-xl bg-darkgray px-4 py-2.5 font-primary text-base font-medium text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="ml-3 mt-6 w-5/6 rounded-xl bg-red px-4 py-2.5 font-primary text-base font-medium text-white"
              >
                Decline
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MissionDecision;
