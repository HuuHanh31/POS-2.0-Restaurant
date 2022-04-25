import Payment from './components/Payment'
import Menu from './components/Menu'
import Home from "./components/Admin/home/Home";
import Login from "./components/Admin/login/Login";
import List from "./components/Admin/list/List";
import ProductsList from "./components/Admin/productsList/ProductsList";
import Single from "./components/Admin/single/Single";
import New from "./components/Admin/new/New";
import Newproducts from "./components/Admin/newproducts/Newproducts";
import {  Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./css/dark.scss";
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
