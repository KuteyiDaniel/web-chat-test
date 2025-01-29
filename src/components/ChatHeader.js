import React from "react";
import ChatRoomImage from "../../src/sign-8032702_640.jpg";
import { HiArrowLeft } from "react-icons/hi2";

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <button className="back-btn"> <HiArrowLeft/> </button>
      <div className="user-info">
        <img src={ChatRoomImage} alt="Profile" className="user-avatar" />
        <div className="user-details">
          <h3 className="user-name">Chatroom</h3>
          {/* <span className="online-status"> */}
            {/* <span className="online-dot"></span> */}
          {/* </span> */}
        </div>
      </div>
      <button className="options-btn">⋮</button>
    </div>
  );
};

export default ChatHeader;
