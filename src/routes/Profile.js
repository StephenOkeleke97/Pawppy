import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.userReducer.value.user);
  const navigate = useNavigate();

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
              alt="profile"
            />
          </div>

          <div className="profile-name">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <MdOutlineModeEditOutline
              className="editname-icon"
              onClick={handleEditName}
            />
          </div>
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
    </div>
  );
};

export default Profile;
