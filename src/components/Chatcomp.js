import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MicRounded,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "../chat.css";
import axios from "../axios";
import { useParams } from "react-router-dom";

function Chatcomp({ messages }) {
  const [input, setInput] = useState("");
  const messagesEndRef = React.useRef(null);
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    axios
      .get(`/rooms/${roomId}`)
      .then((res) => {
        setRoomName(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [roomId]);

  const sendmsg = async (event) => {
    event.preventDefault();
    await axios
      .post("/app/messages/new", {
        message: input,
        name: "jr",
        timestamp: "just now",
        recieved: false,
      })
      .catch((err) => {
        console.log(err);
      });
    setInput("");
  };

  const renderMsg = messages.map((message, index) => (
    <p key={index} className={`chat__msg ${message.recieved && "chat__rsv"}`}>
      <span className="chat__name">{message.name}</span>
      {message.message}
      <span className="chat__timestamp">{message.timestamp}</span>
    </p>
  ));

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${roomName}.svg?m=10`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {renderMsg}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Type a message..."
            className="chat__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendmsg}>
            send a message
          </button>
        </form>
        <MicRounded />
      </div>
    </div>
  );
}

export default Chatcomp;
