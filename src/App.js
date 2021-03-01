import "./App.css";
import Chatcomp from "./components/Chatcomp";
import Sidebar from "./components/Sidebar";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axios from "./axios";
import { Route, Router, Switch, withRouter } from "react-router-dom";
import LoginComp from "./components/LoginComp";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [msgs, setMsgs] = useState([]);
  const user = useSelector((store) => store);

  useEffect(() => {
    axios.get("/app/messages/sync").then((res) => {
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
  console.log(user);

  return user ? (
    <div className="app">
      <div className="app__body">
        <Switch>
          <Route path="/app/rooms/:roomId">
            <Sidebar user={user.user.user} />
            <Chatcomp messages={msgs} />
          </Route>
          <Route path="/app">
            <Sidebar user={user.user.user} />
          </Route>
          <Route path="/">
            <Sidebar user={user.user.user} />
          </Route>
        </Switch>
      </div>
    </div>
  ) : (
    <div className="app">
      <LoginComp />
    </div>
  );
}

export default withRouter(App);
