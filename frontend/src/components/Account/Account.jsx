import { useState } from "react";
import "./Account.scss";
import UserAccount from "../UserAccount/UserAccount";
import EditUserAccount from "../EditUserAccount/EditUserAccount";

function Account() {
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'édition du nom d'utilisateur

  const handleEdit = () => {
    setIsEditing(true); // Lors de l'édition, passer en mode édition
  };

  const handleCancel = () => {
    setIsEditing(false); // Lors de l'annulation, revenir en mode affichage
  };

  return (
    <>
      {/* Afficher soit UserAccount soit EditUserAccount en fonction de l'état */}
      {isEditing ? (
        <EditUserAccount onCancel={handleCancel} />
      ) : (
        <UserAccount onEdit={handleEdit} />
      )}

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
}

export default Account;
