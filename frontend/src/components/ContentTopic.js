import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import NavBar from "../common/NavBar";
import StepsIndicator from "../common/StepsIndicator";
import ErrorAlert from "../common/ErrorAlert";

const ContentTopic = () => {
  const navigate = useNavigate();

  const [blogPost, setBlogPost] = useState(true);
  const [textPost, setTextPost] = useState(true);
  const [facelessVideo, setFacelessVideo] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [topic, setTopic] = useState("");

  useEffect(() => {}, []);

  const showModal = () => {
    setError(null);
    document.getElementById("winning_modal").showModal();
  };

  return (
    <div>
      <dialog id="winning_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            What would you like to generate?
          </h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">SEO Blog Post</span>
              <input
                type="checkbox"
                checked={blogPost}
                onChange={(e) => setBlogPost(e.target.checked)}
                className="checkbox"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Text Post</span>
              <input
                type="checkbox"
                checked={textPost}
                onChange={(e) => setTextPost(e.target.checked)}
                className="checkbox"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Faceless Video</span>
              <input
                type="checkbox"
                checked={facelessVideo}
                onChange={(e) => setFacelessVideo(e.target.checked)}
                className="checkbox"
              />
            </label>
          </div>
          <div className="py-4">
            <button
              className="btn btn-primary w-full max-w-lg"
              onClick={showModal}
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
