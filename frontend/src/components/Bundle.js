import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepsIndicator from "../common/StepsIndicator";
import NavBar from "../common/NavBar";
import config from "../config";
import ErrorAlert from "../common/ErrorAlert";

const Bundle = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, []);

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
                <p>
                  Are you struggling to keep up with your social media presence
                  while running your business? You're not alone. Many
                  entrepreneurs find themselves overwhelmed by the constant
                  demand for engaging content.
                </p>
                <p>
                  In today's digital landscape, maintaining a strong online
                  presence is crucial for business success. However, creating
                  quality content consistently can feel like a full-time job on
                  its own. From crafting engaging posts to selecting the perfect
                  visuals, the process can be time-consuming and mentally
                  draining.
                </p>
                <p>
                  But what if there was a better way? Imagine having a dedicated
                  AI assistant that understands your brand voice and can
                  generate compelling content in seconds. That's exactly what
                  our platform offers - a revolutionary solution that combines
                  artificial intelligence with marketing expertise.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Copy</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 h-[calc(12rem/9*16)] my-6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">LinkedIn Post</h2>
                <p>
                  Are you struggling to keep up with your social media presence
                  while running your business? You're not alone. Many
                  entrepreneurs find themselves overwhelmed by the constant
                  demand for engaging content.
                </p>
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
                <h2 className="card-title">Generated Image</h2>
                <figure className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/assets/deer.jpg"
                    alt="Generated marketing visual"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Download</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 my-6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Long Tweet</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Copy</button>
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
