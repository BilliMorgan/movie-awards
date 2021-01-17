import React from "react";
import "../Style.css";

const Error = (props) => {
  return (
    <>
      <div className="error-message">
        <h3>{props.children}</h3>
        <ion-icon
          name="close-circle-outline"
          className="ico-close"
          onClick={() => props.onClose()}
        ></ion-icon>
      </div>
    </>
  );
};
export default Error;
