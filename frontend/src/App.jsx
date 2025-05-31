import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Login from "./Routes/Login/Login";
import Home from "./Routes/Home/Home";
import Menu from "./Routes/Menu/Menu";

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
