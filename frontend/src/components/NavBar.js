import React from "react";
import StepsIndicator from "./StepsIndicator";
const NavBar = ({ index }) => {
  const pages = ["/", "/avatar", "/bundle", "/poster"];

  const navigate = (direction) => {
    const newIndex = direction === "prev" ? index - 1 : index + 1;
    window.location.href = pages[newIndex - 1];
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="flex-none">
          <StepsIndicator currentStep={index} />
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Brand</a>
            </li>
            <li>
              <a href="/avatar">Topic</a>
            </li>
            <li>
              <a href="/bundle">Bundle</a>
            </li>
            <li>
              {index >= 3 ? (
                <a href="/poster">Review</a>
              ) : (
                <span className="text-gray-400">Review</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-xl p-0">Marketing Hero</a>
      </div>
      <div className="navbar-end">
        <div className="join grid grid-cols-2">
          {index > 1 && (
            <button
              className="join-item btn btn-outline"
              onClick={() => navigate("prev")}
            >
              Prev
            </button>
          )}
          {index < 4 && (
            <button
              className="join-item btn btn-outline"
              onClick={() => navigate("next")}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
