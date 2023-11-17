import React, { useState, useEffect } from "react";
import StorerQuery from "./StorerQuery";
import StorerDeclined from "./StorerDeclined";
import StorerApproved from "./StorerApproved";

import { Values } from "./StorerQuery";

function StorerApp() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const submit = (values: Values) => {};

  useEffect(() => {
    for (let i: number = 0; i < 3; i++) {
      document
        .getElementsByClassName("tabLink")
        [i].classList.replace("block", "hidden");
    }

    document
      .getElementsByClassName("tabLink")
      [selectedIndex].classList.replace("hidden", "block");
  }, [selectedIndex]);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-3 p-7 bg-gray rounded-xl font-primary text-darkgray">
      <div className="hidden w-full tabLink">
        <StorerQuery submit={submit} setSelectedIndex={setSelectedIndex} />
      </div>

      <div className="hidden w-full tabLink">
        <StorerDeclined setSelectedIndex={setSelectedIndex} />
      </div>

      <div className="hidden w-full approveDecline tabLink">
        <StorerApproved setSelectedIndex={setSelectedIndex} />
      </div>
    </div>
  );
}

export default StorerApp;
