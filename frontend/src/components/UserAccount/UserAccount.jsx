import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/UserSlice";
import "./UserAccount.scss";

const UserAccount = ({ onEdit }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.userInfo);

  // Charger les données utilisateur dès que le token est disponible
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [token, dispatch]);

  return (
    <div className="header">
      {user ? (
        <>
          <h1>
            Welcome back,
            <br />
            {user.firstName} {user.lastName}!
          </h1>
          <button className="edit-button" onClick={onEdit}>
            Edit Name
          </button>
        </>
      ) : (
        <p>Loading...</p> // Affichage si les données ne sont pas encore récupérées
      )}
    </div>
  );
};

export default UserAccount;
