import React from "react";

const Settings = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button className="btn btn-error">Logout</button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="label">Profile Settings</label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Notification Preferences</label>
          <select className="select select-bordered w-full">
            <option disabled selected>
              Select your preference
            </option>
            <option>Email</option>
            <option>SMS</option>
            <option>Push Notifications</option>
          </select>
        </div>
        <div>
          <label className="label">Privacy Settings</label>
          <input type="checkbox" className="checkbox" />
          <span className="ml-2">Make my profile private</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
