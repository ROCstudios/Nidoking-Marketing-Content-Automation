import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Conversation from "./components/Conversation";
import ContentTopic from "./components/ContentTopic";
import Bundle from "./components/Bundle";
import Settings from "./components/Settings";
import FirebaseAuth from "./components/FirebaseAuth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = {
      email: "test@test.com",
    };
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
        <FirebaseAuth />
      )}
      <Routes>
        <Route path="/" element={<FirebaseAuth />} />
        <Route path="/convo" element={<Conversation />} />
        <Route path="/avatar" element={<ContentTopic />} />
        <Route path="/bundle" element={<Bundle />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
