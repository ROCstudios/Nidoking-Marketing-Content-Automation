import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Conversation from "./components/Conversation";
import ContentTopic from "./components/ContentTopic";
import Bundle from "./components/Bundle";
import Settings from "./components/Settings";
import Login from "./components/Login";
import UserStore from "./data/UserStore";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = UserStore.getUserData();
    setUser(user);
  }, []);

  return (
    <Router>
      {user ? (
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Marketing Hero</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/">Create</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <Routes>
        <Route path="/" element={<Conversation />} />
        <Route path="/avatar" element={<ContentTopic />} />
        <Route path="/bundle" element={<Bundle />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
