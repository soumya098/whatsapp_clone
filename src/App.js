import "./App.css";
import Chatcomp from "./components/Chatcomp";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axios from "./axios";

function App() {
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      console.log(res.data);
      setMsgs(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("2bba223a1557e4158560", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMsgs([...msgs, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msgs]);

  console.log(msgs);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chatcomp messages={msgs} />
      </div>
    </div>
  );
}

export default App;
