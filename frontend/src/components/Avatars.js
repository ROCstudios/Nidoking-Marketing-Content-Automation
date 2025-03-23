import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import UserStore from "../data/UserStore";

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

// A sub-component for rendering a voice sample with a spherical audio player.
// The voice selection is now triggered by clicking on the voice's name.
function VoiceSample({ voice, isSelected, onSelect }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div
      className={`voice-sample m-4 cursor-pointer flex flex-col items-center ${
        isSelected
          ? "border-4 border-primary rounded-xl p-2"
          : "border border-transparent"
      }`}
    >
      <div
        className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-2"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        <span className="text-white text-xl">{isPlaying ? "||" : "▶"}</span>
      </div>
      <audio ref={audioRef} src={voice.sample_url} hidden />
      <h3 className="text-lg font-medium" onClick={() => onSelect(voice)}>
        {voice.name}
      </h3>
    </div>
  );
}

function AvatarGallery() {
  const { title, topic } = useLocation().state;

  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [voices, setVoices] = useState([]);
  const [voiceLoading, setVoiceLoading] = useState(true);
  const [voiceError, setVoiceError] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch avatar data from the characters endpoint
  useEffect(() => {
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

  // Fetch voices data from the voices endpoint (using the characters/voices route)
  useEffect(() => {
    fetch(`${config.backendUrl}/characters/voices`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVoices(data);
        setVoiceLoading(false);
      })
      .catch((err) => {
        setVoiceError(err);
        setVoiceLoading(false);
      });
  }, []);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("selectedAvatar", JSON.stringify(avatar));
  };

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
    localStorage.setItem("selectedVoice", JSON.stringify(voice));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${config.backendUrl}/user/voice_render`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: UserStore.getCurrentUser()?.email,
          voice_id: selectedVoice.voice_id,
          render_id: selectedAvatar.id,
        }),
      });

      if (response.ok) {
        navigate("/bundle", {
          state: {
            title,
            topic,
            render_id: selectedAvatar.id,
            voice_id: selectedVoice.voice_id,
            prompt: selectedAvatar.prompt,
          },
        });
      } else {
        const errorData = await response.json();
        console.error("Error submitting voice/render:", errorData);
      }
    } catch (error) {
      console.error("Error submitting voice/render:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <p>Loading avatars...</p>
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
                Selected Character: {selectedAvatar.name}
              </p>
            </div>
          )}
          <hr className="w-full my-8 border-gray-300" />
          <h2 className="text-4xl font-bold mb-2">Select Your Voice</h2>
          <p className="mb-6 text-lg text-gray-600">
            Click on the name to select your voice.
          </p>
          {voiceLoading ? (
            <div className="mb-4">
              <p>Loading voices...</p>
            </div>
          ) : voiceError ? (
            <ErrorAlert message={voiceError.message} />
          ) : (
            <div className="voice-gallery flex flex-wrap justify-center">
              {voices.map((voice) => (
                <VoiceSample
                  key={voice.voice_id}
                  voice={voice}
                  isSelected={
                    selectedVoice && selectedVoice.voice_id === voice.voice_id
                  }
                  onSelect={handleVoiceSelect}
                />
              ))}
            </div>
          )}
          {selectedVoice && (
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Selected Voice: {selectedVoice.name}
              </p>
            </div>
          )}

          <button
            className="btn btn-primary w-full max-w-lg"
            disabled={!selectedAvatar || !selectedVoice || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Generate Content Bundle"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarGallery;
