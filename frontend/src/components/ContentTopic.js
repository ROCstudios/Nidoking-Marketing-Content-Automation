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

  const [error, setError] = useState(null);

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div>
      <dialog id="winning_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <div className="py-4"></div>
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
            <div className="flex flex-col gap-4 mt-4">
              <button
                className="btn btn-secondary w-full max-w-lg"
                onClick={() =>
                  navigate("/avatars", { state: { title, topic } })
                }
              >
                Move On To Choose Avatar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTopic;
