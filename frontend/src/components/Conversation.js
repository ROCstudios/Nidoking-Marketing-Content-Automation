import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import ErrorAlert from "../common/ErrorAlert";
import axios from "axios";
import config from "../config";

const Conversation = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [solution, setSolution] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post(`${config.backendUrl}/create_brand`, {
      user_email: user.email,
      avatar,
      painPoints,
      solution,
    });
    if (response.status === 200) {
      navigate("/avatar");
    } else {
      setError("Failed to get authentication URL");
    }
  };

  return (
    <div>
      <NavBar index={1} />
      {error && <ErrorAlert message={error} />}
      <div className="hero bg-base-200 min-h-screen">
        <div className="flex flex-col">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                Tell us about your brand 🧠
              </h1>
              <p className="py-6"></p>
              <label>
                <div className="label font-bold">
                  <span className="font-bold">Who do you serve?</span>
                </div>
                <textarea
                  placeholder="Talk about your avatar..."
                  className="textarea textarea-bordered textarea-lg w-full max-w-lg"
                  onChange={(e) => setAvatar(e.target.value)}
                ></textarea>
              </label>
              <label>
                <div className="label font-bold">
                  <span className="font-bold">What are their pain points?</span>
                </div>
                <textarea
                  placeholder="Describe their problems..."
                  className="textarea textarea-bordered textarea-lg w-full max-w-lg"
                  onChange={(e) => setPainPoints(e.target.value)}
                ></textarea>
              </label>
              <label>
                <div className="label font-bold">
                  <span className="font-bold">
                    What is the unique way you solve their problems?
                  </span>
                </div>
                <textarea
                  placeholder="Present your solution..."
                  className="textarea textarea-bordered textarea-lg w-full max-w-lg"
                  onChange={(e) => setSolution(e.target.value)}
                ></textarea>
              </label>
              <button
                className="btn btn-primary w-full max-w-lg mt-4"
                onClick={() => (window.location.href = "/avatar")}
              >
                Continue to Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
