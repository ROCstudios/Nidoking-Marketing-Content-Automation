import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import ErrorAlert from "../common/ErrorAlert";
import config from "../config";
import alice from "../assets/alice.jpeg";
import ana from "../assets/ana.jpeg";
import ben from "../assets/ben.jpeg";
import eva from "../assets/eva.jpeg";
import josie from "../assets/josie.jpeg";
import sam from "../assets/sam.jpeg";
import sara from "../assets/sara.jpeg";
import tia from "../assets/tia.jpeg";
import zoe from "../assets/zoe.jpeg";

// Create a mapping from avatar name to asset
const avatarAssets = {
  Alice: alice,
  Ana: ana,
  Ben: ben,
  Eva: eva,
  Josie: josie,
  Sam: sam,
  Sara: sara,
  Tia: tia,
  Zoe: zoe,
};

function AvatarGallery() {
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Make an HTTP request to the characters endpoint
    fetch(`${config.backendUrl}/characters`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAvatars(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    // Save the selected avatar locally
    localStorage.setItem("selectedAvatar", JSON.stringify(avatar));
  };

  if (loading) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <ErrorAlert message={error.message} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar index={4} />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-8">Select Your Character</h1>
          <div className="avatar-gallery flex flex-wrap justify-center">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`avatar m-4 cursor-pointer text-center p-2 transition-all duration-200 flex flex-col items-center ${
                  selectedAvatar && selectedAvatar.id === avatar.id
                    ? "border-4 border-primary rounded-xl"
                    : "border border-transparent"
                }`}
                onClick={() => handleAvatarSelect(avatar)}
              >
                <img
                  src={avatarAssets[avatar.name]}
                  alt={avatar.name}
                  className="w-48 h-48 max-w-[100px] max-h-[100px] object-cover rounded-full mx-auto"
                />
                <h3 className="mt-2 text-lg font-medium">{avatar.name}</h3>
              </div>
            ))}
          </div>
          {selectedAvatar && (
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Selected: {selectedAvatar.name}
              </p>
            </div>
          )}
          <button
            className="btn btn-primary mt-6"
            disabled={!selectedAvatar}
            onClick={() => navigate("/bundle")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarGallery;
