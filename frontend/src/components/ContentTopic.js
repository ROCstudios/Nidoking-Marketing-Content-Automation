import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import NavBar from "./NavBar";
import StepsIndicator from "./StepsIndicator";
import ErrorAlert from "./ErrorAlert";

const ContentTopic = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [topic, setTopic] = useState("");

  useEffect(() => {}, []);

  return (
    <div>
      <NavBar index={2} />
      {error && <ErrorAlert message={error} />}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">
              What would you like to talk about?
            </h1>
            <p className="py-6"></p>
            <label>
              <div className="label font-bold">
                <span className="font-bold">
                  Describe the unique angle your content is going to take?
                </span>
              </div>
              <textarea
                placeholder="It's time to get creative..."
                className="textarea textarea-bordered textarea-lg w-full max-w-lg"
                onChange={(e) => setTopic(e.target.value)}
              ></textarea>
            </label>
            <button
              className="btn btn-primary w-full max-w-lg mt-4"
              onClick={() => (window.location.href = "/bundle")}
            >
              Generate Content Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTopic;
