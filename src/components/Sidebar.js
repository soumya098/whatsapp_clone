import React, { useEffect, useState } from "react";
import "../sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLarge from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import axios from "../axios";
import Pusher from "pusher-js";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("/rooms/sync").then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("2bba223a1557e4158560", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (data) {
      setRooms([...rooms, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);
  console.log(rooms);
  const renderRooms = rooms.map((room, index) => (
    <SidebarChat key={index} roomName={room.name} />
  ));
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <IconButton>
            <Avatar src="https://ootdmagazine.com/wp-content/uploads/2015/02/10-Reasons-Why-Guys-love-nerdy-Girls-OOTD-Magazine.jpg" />
          </IconButton>
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            className="sidebar__input"
            type="text"
            placeholder="Search or Start a New chat"
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {renderRooms}
      </div>
    </div>
  );
}

export default Sidebar;
