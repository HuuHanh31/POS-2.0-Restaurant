import "./productslist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Dataproductstable from "../../components/dataproductstable/Dataproductstable"
const ProductsList = () => {
  return (
    <div className="productslist">
      <Sidebar/>
      <div className="productslistContainer">
        <Navbar/>
        <Dataproductstable/>
      </div>
    </div>
  )
}

export default ProductsList