import React, { useEffect, useState } from "react";
import IncidentsHeader from "./IncidentsHeader/IncidentsHeader";
import IncidentsList from "./IncidentsList/IncidentsList";
import Button from "../Button/Button";
import { Formik, Field, ErrorMessage, Form } from "formik";
import CustomTab from "../CustomTab/CustomTab";

type ListItemsProps = {
  image: string;
  title: string;
  date: string;
  content: string;
};

const Incidents = () => {
  const [ListItems, setListItems] = useState<ListItemsProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isState, setIsState] = useState<boolean>(false);
  const [isReport, setReport] = useState<boolean>(true);
  const headerData = ["Another Collector", "Storer", "Creator/Recyclium"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleButtonClicked = (isClicked: boolean) => {
    setIsState(isClicked);
    setReport(true);
  };

  useEffect(() => {
    setTotalCount(ListItems.length);
  }, [ListItems]);

  const renderIncidentHistory = () => {
    if (ListItems.length === 0) {
      return (
        <div className="mt-4 flex h-[294px] w-full items-center justify-center rounded-xl bg-white">
          <div className="text-sm font-normal text-darkgray">
            No incidents :)
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-4 h-full max-h-[294px] w-full overflow-y-auto rounded-xl bg-white text-center">
          <IncidentsList items={ListItems} />
        </div>
      );
    }
  };

  const handleIncreCount = (values: any) => {
    var reporter = "";
    if (selectedIndex == 0) {
      reporter = "Another Collector";
    } else if (selectedIndex == 1) {
      reporter = "Storer";
    } else {
      reporter = "Creator/Recyclium";
    }
    const formattedDate = getCurrentDateFormatted();

    setListItems((prevListItems) => [
      ...prevListItems,
      {
        image: "/assets/images/incident_profile1.svg",
        title: `Melissa was reported by ${reporter}`,
        date: formattedDate,
        content: values.reportDescription,
      },
    ]);
    setReport(false);
    setSelectedIndex(0);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.reportDescription) {
      errors.reportDescription = "Input this field";
    }
    return errors;
  };

  function getCurrentDateFormatted() {
    const currentDate = new Date();
    const options: any = {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return currentDate.toLocaleString("en-US", options);
  }

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
  };

  const renderReportIncident = () => (
    <>
      <div className="mb-2 mt-4 font-primary text-sm font-normal text-darkgray">
        Reported By
      </div>
      <CustomTab headers={headerData} onTabClick={handleTabClick} />
      <div className="mb-2 mt-6 font-primary text-sm font-normal text-darkgray">
        Report Description
      </div>
      <Formik
        initialValues={{ reportDescription: "" }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          handleIncreCount(values);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <Form className="flex h-[233px] flex-col">
            <Field
              as="textarea"
              className="mt-1 h-[146px] w-full rounded-md bg-white px-4 py-4 font-primary text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              name="reportDescription"
              placeholder="e.g. Vulgar language, Fraud...etc"
            />
            <ErrorMessage
              name="reportDescription"
              component="div"
              className="text-sm font-normal text-red"
            />
            <div className="h-[0px] flex-grow" />
            <Button
              type="button"
              className="w-full rounded-xl bg-darkgray font-primary text-white"
              onClick={handleSubmit}
            >
              Report
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <div className="h-[458px] w-full max-w-[531px] rounded-lg bg-gray px-6 pb-6 pt-4 shadow">
      {isState ? (
        <IncidentsHeader
          title="Incident History"
          onButtonClicked={() => handleButtonClicked(false)}
          totalCount={totalCount}
          isReport={isReport}
        />
      ) : (
        <IncidentsHeader
          title="Report an Incident"
          onButtonClicked={() => handleButtonClicked(true)}
          totalCount={totalCount}
          isReport={isReport}
        />
      )}
      {!isState ? renderIncidentHistory() : renderReportIncident()}
      {!isState && (
        <div className="w-full">
          <Button
            type="button"
            className={`mt-6 w-full rounded-xl bg-red font-primary text-white ${
              ListItems.length === 0 ? "cursor-not-allowed bg-opacity-30" : ""
            }`}
            disabled={ListItems.length === 0}
          >
            Ban User
          </Button>
        </div>
      )}
    </div>
  );
};

export default Incidents;
