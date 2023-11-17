import React, { useState, useEffect } from "react";
import MissionUnverifiedDetails from "./MissionUnverifiedDetails";
import MissionDecision from "./MissionDecision";
import MissionDeclined from "./MissionDeclined";
import MissionCreator from "./MissionCreator";
import MissionCreatorVerified from "./MissionCreatorVerified";

const MissionUnMain = () => {
  const initialStatus = localStorage.getItem("approvedStatus");
  const [currentComponent, setCurrentComponent] = useState(
    initialStatus || "main",
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("approvedStatus", "main");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (initialStatus == "approved") {
      setIsActive(true);
    } else if (currentComponent == "approved") {
      localStorage.setItem("approvedStatus", "approved");
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentComponent]);

  const renderComponent = () => {
    switch (currentComponent) {
      case "main":
        return (
          <MissionUnverifiedDetails
            onDeclineClick={() => setCurrentComponent("decline")}
            onApproveClick={() => setCurrentComponent("approved")}
          />
        );
      case "decline":
        return (
          <MissionDecision
            onDeclineConfirmClick={() => setCurrentComponent("declineFinal")}
            onCancelClick={() => setCurrentComponent("main")}
          />
        );
      case "declineFinal":
        return <MissionDeclined />;
      case "approved":
        return (
          <>{isActive ? <MissionCreator /> : <MissionCreatorVerified />}</>
        );
      default:
        return null;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default MissionUnMain;
