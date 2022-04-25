import Payment from './payment/Payment'
import Menu from'./menu/Menu'
import Signin from './signin/Signin'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ProductsList from "./pages/productsList/ProductsList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Newproducts from "./pages/newproducts/Newproducts";
import {  Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {useState} from 'react'
function App() {
  const [app, setApp] = useState('Menu')

  const handleChangePaymentApp = () =>{
    setApp('Payment')
  }
  const handleChangeMenuApp = () =>{
    setApp('Menu')
  }

  
  return (
    <>
      <Routes>
      <Route path="/" element={app === 'Menu' ? <Menu changeApp={handleChangePaymentApp}/> :<Payment changeApp={handleChangeMenuApp}/>} />
          <Route path="/">
            <Route path="admin" index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductsList />} />
              <Route path=":productId" element={<Newproducts inputs={productInputs} title="Edit Product" />} />
              <Route
                path="new"
                element={<Newproducts inputs={productInputs} title="Edit Product" />}
              />
            </Route>
          </Route>
        </Routes>
    </>
  )
}

export default App;
