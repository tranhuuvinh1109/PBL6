import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-overlay">
      <div className="flex h-full w-full justify-center items-center">
        <Spinner animation="grow" className="text-greenCustom" />
      </div>
    </div>
  );
};

export default Loading;
