import "./FormConnexion.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

function FormConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialisation de la redirection

  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Redirection après une connexion réussie
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user"); // Rediriger vers la page profil si connecté
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>

      {isLoggedIn ? (
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

          <button
            className="sign-in-button"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Connexion..." : "Sign In"}
          </button>

          {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </section>
  );
}

export default FormConnexion;
