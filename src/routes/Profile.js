import React, { useEffect, useRef, useState } from "react";
import { AiOutlineRight, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import ReactModal from "react-modal";

const Profile = () => {
  const windowWidth = useOutletContext();
  const fileInput = useRef(null);
  const filePreview = useRef(null);
  const user = useSelector((state) => state.userReducer.value.user);
  const navigate = useNavigate();

  const [filePreviewVisible, setFilePreviewVisible] = useState(false);

  useEffect(() => {
    const authenticated = document.cookie.indexOf("auth=") !== -1;

    if (!authenticated) navigate("/");
  });

  useEffect(() => {
    function handleFileUpload(event) {
      setFilePreviewVisible(true);
      filePreview.current.src = URL.createObjectURL(fileInput.current.files[0]);
    }

    fileInput.current.addEventListener("change", handleFileUpload);
    return () => {
      if (fileInput.current)
        fileInput.current.removeEventListener("change", handleFileUpload);
    };
  }, []);

  const handleEditName = () => {
    navigate("/user/name");
  };

  const handleEditPhoneNumber = () => {
    navigate("/user/phonenumber");
  };

  const handleEditPassword = () => {
    navigate("/user/changepassword");
  };

  return (
    <div className="user-tabs-container profile-container">
      <div className="profile-header">
        <h1>Account</h1>
      </div>

      <div className="profile-pic-container">
        <div className="profile-name-container">
          <div className="profile-pic">
            <img
              className="profile-pic-image"
              src="/images/loginusericon.png"
            />
            <div className="upload-image">
              <label className="file-input-label" htmlFor="file">
                <BiImageAdd size={30} color="#fff" />
              </label>
            </div>
          </div>

          <div className="profile-name">
            <p>{user.firstName} {user.lastName}</p>
            <MdOutlineModeEditOutline
              className="editname-icon"
              onClick={handleEditName}
            />
          </div>
        </div>

        <div className="upload-image-button">
          {windowWidth <= 700 && <button>upload</button>}
        </div>
      </div>

      <div className="contact-info-container">
        <h2>Contact Info</h2>

        <div className="contact-info">
          <p>EMAIL</p>
          <p>{user.email}</p>
        </div>

        <div className="contact-info">
          <p>PHONE NUMBER</p>
          <div className="contact-info-clickable">
            <p>{user.phoneNumber}</p>
            <AiOutlineRight onClick={handleEditPhoneNumber} />
          </div>
        </div>
      </div>

      <div className="contact-info-container">
        <h2>Security</h2>
        <div className="contact-info">
          <p>PASSWORD</p>
          <div className="contact-info-clickable">
            <p>••••••••••</p>
            <AiOutlineRight onClick={handleEditPassword} />
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={filePreviewVisible}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            zIndex: "2",
          },
        }}
        ariaHideApp={false}
        contentElement={() => {
          return (
            <div className={"image-preview"}>
              <div className="image-preview-toolbar">
                <AiOutlineClose
                  size={16}
                  className="image-preview-icon"
                  onClick={() => {
                    setFilePreviewVisible(false);
                  }}
                />
                <div className="image-preview-toolbar-text">
                  <p>Confirm Upload</p>
                  <div className="image-preview-toolbar-revert">
                    <p>Upload</p>
                    <label htmlFor="file">
                    <RiArrowGoBackFill className="image-preview-icon"/>
                    </label>
                  </div>
                </div>
              </div>

              <div className="image-preview-image-container">
                  <img ref={filePreview} alt="profile picture preview"/>
                  <div className="upload-image-icon">
                    <AiOutlineCheck />
                  </div>
              </div>
            </div>
          );
        }}
      />
      <input
        className="file-input"
        type={"file"}
        id="file"
        name="file"
        accept="image/*"
        ref={fileInput}
        tabIndex={-1}
      />
    </div>
  );
};

export default Profile;
