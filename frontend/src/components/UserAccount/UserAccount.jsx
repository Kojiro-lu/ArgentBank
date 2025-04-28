import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserUsername } from "../../store/UserSlice"; // Assurez-vous d'utiliser getUserProfile
import "./UserAccount.scss";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); // Accès au token
  const user = useSelector((state) => state.user.userInfo); // Accès aux infos utilisateur

  const [isEditing, setIsEditing] = useState(false); // État pour l'édition
  const [username, setUsername] = useState(user?.userName || ""); // Initialisation avec le userName du store

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile()); // Utiliser getUserProfile pour récupérer les données
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user?.userName) {
      setUsername(user.userName); // Assurez-vous que username est mis à jour avec le userName du store
    }
  }, [user]); // Effectué chaque fois que 'user' change

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserUsername(username)); // Mise à jour du nom d'utilisateur
    setIsEditing(false);
  };

  return (
    <div className="header">
      {user && (
        <>
          <h1>
            Welcome back,
            <br />
            {user.firstName} {user.lastName}!
          </h1>
          {!isEditing ? (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="input-wrapper-form">
                <label htmlFor="username">User name</label>
                <input
                  type="text"
                  id="username"
                  value={username} // Récupère directement la valeur du store Redux
                  onChange={(e) => setUsername(e.target.value)} // Met à jour l'état local quand l'utilisateur tape
                />
              </div>
              <div className="input-wrapper-form">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  disabled
                />
              </div>
              <div className="input-wrapper-form">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  disabled
                />
              </div>
              <div className="button-group">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateUser;
