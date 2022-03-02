import React from "react";
import DaumPostcode from "react-daum-postcode";

const DaumPost = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const isPopupOpen = props.isPopupOpen;
  const setIsPopupOpen = props.setIsPopupOpen;

  const onCompletePost = (data) => {
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
    right: "-50px",
    bottom: "-250px",
    padding: "7px",
    zIndex: 100, 
  };

  const daumPostBtnStyle = {
    border:"0px",
    position:"absolute",
    display: "block",
    zIndex: 100,
    width: "700px",
    right: "-45px",
    bottom: "158px",
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