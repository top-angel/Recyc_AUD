import React, { ReactNode } from "react";

import classNames from "classnames";

type props = {
  fullHeight?: boolean;
  children: ReactNode;
};

const Card = ({ children, fullHeight }: props) => {
  return (
    <div
      className={classNames(
        "p-4 border rounded-md bg-gray border-darkestgray ",
        fullHeight && "h-[calc(100vh-200px)] overflow-auto"
      )}
    >
      {children}
    </div>
  );
};

export default Card;
