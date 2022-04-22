import Payment from './payment/Payment'
import Menu from'./menu/Menu'
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
    <div>
      {app === 'Menu' ? <Menu changeApp={handleChangePaymentApp}/> :<Payment changeApp={handleChangeMenuApp}/>} 
    </div>
  )
}

export default App;
