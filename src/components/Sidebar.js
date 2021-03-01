import React, { useEffect, useState } from "react";
import "../sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLarge from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import axios from "../axios";
import Pusher from "pusher-js";

function Sidebar({ user }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("/app/rooms/sync").then((res) => {
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
    <SidebarChat key={index} roomName={room.name} id={room._id || room.id} />
  ));
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <IconButton>
            <Avatar src={user.photoURL} />
          </IconButton>
          <div className="sidebar__username">{user.displayName}</div>
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
