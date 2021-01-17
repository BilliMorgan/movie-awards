import React from "react";
import "../Style.css";

const Banner = (props) => {
  return (
    <>
      <div className="backdprop"></div>
      <div
        className="banner"
        //banner animation - not finished yet
        // style={{
        //   transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        //   opacity: props.show ? '1' : '0',
        // }}
      >
        <p>Congratulation! You already nominated your 5 favourite movies.</p>
        <button onClick={() => props.close()}> close</button>
      </div>
    </>
  );
};

export default Banner;
