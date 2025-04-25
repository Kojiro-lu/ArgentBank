import "./FormConnexion.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

function FormConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Ajout de l'état errorMessage
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);
  const token = localStorage.getItem("token");

  // Redirection après une connexion réussie (uniquement si un token est présent)
  useEffect(() => {
    if (token) {
      navigate("/User"); // Redirige vers la page profil si connecté
    }
  }, [navigate, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          // Si la connexion réussit, rediriger
          navigate("/User"); // Redirige vers la page profil
        }
      })
      .catch((err) => {
        // Gérer l'erreur si la connexion échoue
        console.error("Erreur de connexion :", err);
        // Afficher un message d'erreur à l'utilisateur
        setErrorMessage(
          "Une erreur est survenue lors de la connexion. Veuillez réessayer."
        );
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {token ? (
        <p>Vous êtes connecté !</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </section>
  );
}

export default FormConnexion;
