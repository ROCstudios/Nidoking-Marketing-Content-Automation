import React, { useRef } from "react";

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        controls
        className="w-full rounded-lg"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
