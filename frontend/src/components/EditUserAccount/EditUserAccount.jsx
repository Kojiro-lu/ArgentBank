import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserUsername } from "../../store/UserSlice";
import "./EditUserAccount.scss";

const EditUserAccount = ({ onCancel, onSave }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [username, setUsername] = useState(user?.userName || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }

    dispatch(updateUserUsername(username));

    if (onSave) {
      onSave();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="edit-form-menu">
        <h1>Edit User Info</h1>
        <div className="input-wrapper-form">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-wrapper-form">
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" value={user.firstName} disabled />
        </div>
        <div className="input-wrapper-form">
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" value={user.lastName} disabled />
        </div>
        <div className="button-group">
          <button type="submit" className="save-button">
            Save
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserAccount;
