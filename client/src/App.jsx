import { Route, Routes } from "react-router-dom"
import Customize from "./pages/Shop"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Layout from "./Layout"
import './App.css'

function App() {
  return (
    <>
      <Routes>
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
