import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const DaumPost = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const isPopupOpen = props.isPopupOpen;
  const setIsPopupOpen = props.setIsPopupOpen;



  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    setIsPopupOpen(false);
  };

  const closeModal = (data) => {
    setIsPopupOpen(false);
  }

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    width: "700px",
    height: "400px",
    right: "-350px",
    bottom: "-50px",
    padding: "7px",
    zIndex: 100, 
  };

  const daumPostBtnStyle = {
    position:"absolute",
    display: "block",
    color: "black",
    zIndex: 101,
    width: "710px",
    right: "-345px",
    bottom: "360px",
    backgroundColor:"#888",
    padding:"5px",
    color:"white",
    textAlign:"right"
  }



  return (
    <>
    <div style={{position:"relative"}}>
        <button style={daumPostBtnStyle} onClick={closeModal}>X</button>
        <div>
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}
          onClose={closeModal}
        />
        </div>
    </div>
     
    </>
  );
};

export default DaumPost;