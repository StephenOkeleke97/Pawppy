import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const windowWidth = useOutletContext();
  const user = useSelector((state) => state.userReducer.value.user);

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
              <BiImageAdd size={30} color="#fff" />
            </div>
          </div>

          <div className="profile-name">
            <p>Joseph Ashton</p>
            <MdOutlineModeEditOutline className="editname-icon" />
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
            <p>{user.email}</p>
            <AiOutlineRight />
            </div>
          </div>
      </div>


      <div className="contact-info-container">
          <h2>Security</h2>
          <div className="contact-info">
            <p>PASSWORD</p>
            <div className="contact-info-clickable">
            <p>••••••••••</p>
            <AiOutlineRight />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;
