import React from "react";

/* == Library - style */
import styled from "styled-components";

/* == Library  */
import PropTypes from "prop-types";
import { PropagateLoader, ClipLoader } from "react-spinners";

/* == Custom - Icon */
import PandaSpinner from "../styles/images/Panda_Spinner.svg";
import Loading from "../styles/images/Loading.svg";

const Spinner = (props) => {
  if (!props.visible) {
    return <></>;
  }

  return (
    <React.Fragment>
      {props.Home === "Home" ? (
        <SpinnerBG>
          <SpinnerInner>
            {" "}
            <img src={Loading} alt="PandaSpinnerImage" style={{ marginBottom: "20px" }} />
            <img src={PandaSpinner} alt="PandaSpinnerImage" style={{ marginBottom: "20px" }} />
            <PropagateLoader color="#387E4B" size="15" />
          </SpinnerInner>
        </SpinnerBG>
      ) : (
        <SpinnerInner>
          <ClipLoader color="#387E4B" size="40" />
        </SpinnerInner>
      )}
    </React.Fragment>
  );
};
Spinner.propTypes = {
  visible: PropTypes.bool,
};

const SpinnerBG = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 1000;
`;
const SpinnerInner = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default Spinner;
