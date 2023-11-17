import React, { useState, useEffect } from "react";
import MissionDetailsInfo from "./MissionDetailsInfo";
import MissionDecision from "./MissionDecision";
import MissionDeclined from "./MissionDeclined";
import MissionVerified from "./MissionVerified";
import MissionCreator from "./MissionCreator";
import { useAppSelector } from "src/redux/hooks";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";

const MissionMain = () => {
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

  const { isDataLoading } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
  }));

  const renderComponent = () => {
    switch (currentComponent) {
      case "main":
        return (
          <MissionDetailsInfo
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
        return <>{isActive ? <MissionCreator /> : <MissionVerified />}</>;
      default:
        return null;
    }
  };

  return (
    <div>
      {isDataLoading ? (
        <LoadingSpinner className="-mt-12" />
      ) : (
        <>{renderComponent()} </>
      )}
    </div>
  );
};

export default MissionMain;
