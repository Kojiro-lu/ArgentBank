import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserUsername } from "../../store/UserSlice"; // Action pour mettre à jour le nom d'utilisateur
import "./EditUserAccount.scss";

const EditUserAccount = ({ onCancel }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo); // Accès aux infos utilisateur depuis le store
  const [username, setUsername] = useState(user?.userName || ""); // Valeur initiale venant du store

  useEffect(() => {
    if (user?.userName) {
      setUsername(user.userName); // Met à jour le username local si l'utilisateur a changé
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserUsername(username)); // Envoie la mise à jour du nom d'utilisateur
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
            onChange={(e) => setUsername(e.target.value)} // Met à jour le champ local lors de la saisie
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
