import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import NavBar from "../common/NavBar";
import ErrorAlert from "../common/ErrorAlert";
import UserStore from "../data/UserStore";

const ContentTopic = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    navigate("/bundle", { state: { title, topic } });
  };

  const showModal = () => {
    setError(null);
    document.getElementById("winning_modal").showModal();
  };

  return (
    <div>
      <dialog id="winning_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <div className="py-4">
            <button
              className="btn btn-primary w-full max-w-lg"
              onClick={handleSubmit}
            >
              Let's Go! Generate Content
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
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
                  Quickly add a title for your content bundle
                </span>
              </div>
              <input
                type="text"
                placeholder="Let's get organized..."
                className="input input-bordered w-full max-w-lg"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
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
              onClick={showModal}
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
