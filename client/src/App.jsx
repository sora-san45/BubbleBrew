import { Route, Routes } from "react-router-dom"
import Customize from "./pages/Shop"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Layout from "./Layout"
import './App.css'
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dash/*" element={<Layout />}>
          <Route index element={<Customize />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
