import Avatar from "@material-ui/core/Avatar";
import React, { useEffect, useState } from "react";
import "../sidebarChat.css";
import axios from "../axios";

function SidebarChat({ addNewChat, roomName }) {
  const [seed, setSeed] = useState("nerd");

  useEffect(() => {
    setSeed(roomName);
  }, []);

  const creatRoom = async (event) => {
    event.preventDefault();
    const pEntry = prompt("please enter name for chat");
    await axios
      .post("/rooms/new", {
        name: pEntry,
      })
      .catch((err) => {
        console.log(err);
      });

    if (pEntry) {
      //databse stuff
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?m=10`} />
      <div className="sidebarChat__info">
        <h2>{roomName}</h2>
        <p>message</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={creatRoom}>
      <h3>Add new chat</h3>
    </div>
  );
}

export default SidebarChat;
