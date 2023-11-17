import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../Button/Button";

type Props = {
  title: string;
  onButtonClicked: (isClicked: boolean) => void;
  totalCount?: number;
  isReport?: boolean;
};

const IncidentHistoryHeader = (props: Props) => {
  const { title, onButtonClicked, totalCount, isReport } = props;
  const [currentState, setCurrentState] = useState<boolean>(false);

  const handleClickedPlus = () => {
    setCurrentState(true);
    onButtonClicked(true);
  };

  const closeHandling = () => {
    setCurrentState(false);
    onButtonClicked(false);
  };

  useEffect(() => {
    if (!isReport) {
      setCurrentState(false);
      onButtonClicked(false);
    }
  }, [isReport]);

  const actionButton = !currentState ? (
    <Button type="button" onClick={handleClickedPlus}>
      <Image
        src={"/assets/images/addcircle.svg"}
        alt="addIncident"
        width="24"
        height="24"
      />
    </Button>
  ) : (
    <Button type="button" onClick={closeHandling}>
      <Image
        src={"/assets/images/close.svg"}
        alt="close"
        width="24"
        height="24"
      />
    </Button>
  );

  return (
    <div className="flex w-full items-center justify-between">
      <div className="font-primary text-lg font-semibold text-darkgray">
        {title}
      </div>
      <div className="flex items-center">
        {!currentState && (
          <div className="mr-1 font-primary text-xs font-normal text-darkgray">
            {totalCount} Incidents
          </div>
        )}
        {actionButton}
      </div>
    </div>
  );
};

export default IncidentHistoryHeader;
