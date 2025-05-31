import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Api from "./services/UserLogin.js";
import { AuthContext } from "./contexts/AuthContext";mporta o contexto

function Login() {
  const [values, setValues] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext); // Usa o contexto
  const navigate = useNavigate();

  function onChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await Api.login(values.name, values.password);
      if (response.user) {
        setIsAuthenticated(true); // Marca como autenticado
        navigate("/menu"); // Redireciona sem recarregar a página
      } else {
        setError("Resposta inválida da API.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Usuario ou senha inválidos");
      }
      console.log("Erro no login:", err);
    }
  }

  return (
    <div className="login">
      <Link to="/" className="login__icon">
        <FaArrowAltCircleLeft />
      </Link>
      <div className="login_container">
        <div className="login__cabeçalho">
          Login
          <br />
          <span>DCML</span>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome"
            required
            value={values.name}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Digite a senha"
            required
            value={values.password}
            onChange={onChange}
          />
          <button type="submit">Entrar</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
