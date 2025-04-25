import React from "react";
import "./UserAccount.scss";

function UserAccount({ firstName = "Tony", lastName = "Jarvis" }) {
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default UserAccount;
