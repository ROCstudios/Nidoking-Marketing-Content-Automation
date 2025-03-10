import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../common/NavBar";
import config from "../config";
import ErrorAlert from "../common/ErrorAlert";
import AudioPlayer from "../common/AudioPlayer";
import UserStore from "../data/UserStore";

const Bundle = () => {
  const navigate = useNavigate();
  const { title, topic } = useLocation().state;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bundle, setBundle] = useState({
    seo_blog_post: "",
    social_media_caption: "",
    image: "",
    movie_script: "",
    audio_url: "",
  });

  useEffect(() => {
    const response = axios.post(`${config.backendUrl}/content/text`, {
      email: UserStore.getCurrentUser().email,
      title: title,
      topic: topic,
    });
    if (response.status === 201) {
      setBundle(response.data);
    } else {
      setError("Failed to get authentication URL");
    }
  }, [title, topic]);

  return (
    <div>
      <NavBar index={3} />
      {error && <ErrorAlert message={error} />}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content grid grid-cols-2 gap-8">
          <div className="max-w-lg">
            <div className="card bg-base-100 w-96 h-[calc(24rem/9*16)] shadow-xl">
              <div className="card-body">
                <h2 className="card-title">SEO Blog Post</h2>
                <p>{bundle.seo_blog_post}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Copy</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 h-[calc(12rem/9*16)] my-6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Instagram Post</h2>
                <figure className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={bundle.image}
                    alt="Generated marketing visual"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <p>{bundle.social_media_caption}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Copy</button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-lg">
            <div className="card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Video Ads</h2>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Play</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 my-6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Movie Script</h2>
                <p>{bundle.movie_script}</p>
              </div>
            </div>
            <div className="card bg-base-100 w-96 my-6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Audio Narration</h2>
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Listen to Audio</h1>
                  <AudioPlayer audioUrl={bundle.audio_url} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bundle;
