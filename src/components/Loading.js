import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ text, loading }) => {
  const containerStyle = {
    position: "fixed",
    width: "150px",
    height: "150px",
    backgroundColor:" rgba(145, 143, 143, 0.356)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const loaderStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "14px",
  };
  return (
    <>
      {loading && (
        <div style={containerStyle}>
          <div style={loaderStyle}>
            <ClipLoader
              loading={loading}
              color={"#fff"}
              speedMultiplier={0.5}
            />
            <p>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
