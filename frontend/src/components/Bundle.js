import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepsIndicator from "./StepsIndicator";
import NavBar from "./NavBar";
import config from "../config";
import ErrorAlert from "./ErrorAlert";

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
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Here's your marketing bundle</h1>
            {/* <button className="btn btn-primary w-full max-w-lg mt-4" onClick={handleGenerate}>Generate!</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bundle;
