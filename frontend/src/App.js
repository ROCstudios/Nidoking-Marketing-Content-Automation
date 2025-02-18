import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Conversation from "./components/Conversation";
import ContentTopic from "./components/ContentTopic";
import Bundle from "./components/Bundle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Conversation />} />
        <Route path="/avatar" element={<ContentTopic />} />
        <Route path="/bundle" element={<Bundle />} />
      </Routes>
    </Router>
  );
}

export default App;
