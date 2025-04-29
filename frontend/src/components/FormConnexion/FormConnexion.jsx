import "./FormConnexion.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

function FormConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/User");
    }
  }, [navigate, token]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("token", response.payload.token);
          } else {
            localStorage.removeItem("email");
          }
          navigate("/User");
        }
      })
      .catch((err) => {
        console.error("Erreur de connexion :", err);
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
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
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
