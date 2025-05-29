import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Routes/Login/Login"
import Home from "./Routes/Home/Home"
import Menu from "./Routes/Menu/Menu"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
