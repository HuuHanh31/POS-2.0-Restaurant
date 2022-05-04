import axios from "axios";
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Menubody from './Menubody';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from "react-router-dom";
import verifyToken from '../../midlewares/verifyToken';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import socketClient from "socket.io-client";
import clsx from "clsx";
import styles from "./Menu.module.css";
import getProfile from '../../midlewares/getProfile';
import {
  FaHome,
  FaShoppingCart,
  FaAngleLeft,
  FaAngleRight,
  FaMoneyBill
} from "react-icons/fa";
const SERVER = "http://localhost:4000/";
const classNames = require('classnames');

export default function Menu() {

   const [profile, setProfile] = useState({})
	const [displayName, setDisplayName] = useState('')
	const [changeDB, setChangeDB] = useState('')
   const [payments, setPayment] = useState('online');
   
   

	useEffect(() => {
		const fetch = async () => {
			const pf = await getProfile()
			const theProfile = pf.data['theProfile']
			setProfile(theProfile)
         // console.log(theProfile)
			if (theProfile.fname || theProfile.lname) 
				setDisplayName(theProfile.fname.concat(' ').concat(theProfile.lname))
			// console.log("Profile")
			// console.log(pf.data['theProfile'])
		}
		fetch()
	}, [changeDB])

  const navigate = useNavigate();
   const [dataTag, setDataTag] = useState(() => {
      const { start, end, responsive } = (() => {
         if (window.innerWidth > 992) {
            return {
               start: 0,
               end: 6,
               responsive: 992
            }
         }
         if (window.innerWidth > 768) {
            return {
               start: 0,
               end: 5,
               responsive: 768
            }

         }
         if (window.innerWidth > 576) {
            return {
               start: 0,
               end: 4,
               responsive: 576
            }
         }
         if (window.innerWidth > 478) {
            return {
               start: 0,
               end: 3,
               responsive: 478
            }
         }
         return {
            start: 0,
            end: 2,
            responsive: 477
         }
      })();
      return {
         data: [],
         currentIdx: 0,
         currentIdxProduct: 0,
         quantity: 1,
         start,
         end,
         responsive
      }
   }
   );
   const [showModal, setShowModal] = useState(false);
   const [showModalPayment, setShowModalPayment] = useState(false);
   const [showCart, setShowCart] = useState(false);
   const [dataCart, setDataCart] = useState(() => {
      const data = JSON.parse(localStorage.getItem('ORDER'));
      return data ? data :
         {
            products: [],
            totalOrder: 0
         }
   });
   const [message, setMessage] = useState(null);
   useEffect(() => {
      try {
         let reqOptions = {
            url: "http://localhost:4000/category",
            method: "GET",
         }
         axios.request(reqOptions).then(function (response) {
            setDataTag({
               ...dataTag,
               data: response.data
            })
         })
      }
      catch (e) {
         console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   useEffect(() => {
      var totalOrder = 0;
      dataCart.products.forEach(item => {
         totalOrder += item.totalPrice
      })
      const data = {
         ...dataCart,
         totalOrder
      };
      localStorage.setItem('ORDER', JSON.stringify(data));
      setDataCart(data)
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dataCart.products])
   useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
      
   });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => handleWindowResize(), []);
   function handleWindowResize() {
      if (window.innerWidth > 992) {
         if (dataTag.responsive !== 992)
            setDataTag({
               ...dataTag,
               start: 0,
               currentIdx: 1,
               end: 6,
               responsive: 992
            })
      }
      else if (window.innerWidth > 768) {
         if (dataTag.responsive !== 768)
            setDataTag({
               ...dataTag,
               start: 0,
               currentIdx: 1,
               end: 5,
               responsive: 768
            })
      }
      else if (window.innerWidth > 576) {
         if (dataTag.responsive !== 576)
            setDataTag({
               ...dataTag,
               start: 0,
               currentIdx: 1,
               end: 4,
               responsive: 576
            })
      }
      else if (window.innerWidth > 478) {
         if (dataTag.responsive !== 478)
            setDataTag({
               ...dataTag,
               start: 0,
               currentIdx: 1,
               end: 3,
               responsive: 478
            })
      }
      else {
         if (dataTag.responsive !== 477)
            setDataTag({
               ...dataTag,
               start: 0,
               currentIdx: 1,
               end: 2,
               responsive: 477
            })
      }
   }
   function handleClickTag(idx) {
      setDataTag({
         ...dataTag,
         currentIdx: idx
      })
   }
   function onclickprevbtn() {
      if (dataTag.currentIdx === 0) return;
      if (dataTag.start === dataTag.currentIdx)
         setDataTag({
            ...dataTag,
            start: dataTag.start - 1,
            end: dataTag.end - 1,
            currentIdx: dataTag.currentIdx - 1
         })
      else
         setDataTag({
            ...dataTag,
            currentIdx: dataTag.currentIdx - 1,
         })
   }
   function onclicknextbtn() {
      if (dataTag.currentIdx === dataTag.data.length - 1) return;
      if (dataTag.end === dataTag.currentIdx)
         setDataTag({
            ...dataTag,
            start: dataTag.start + 1,
            end: dataTag.end + 1,
            currentIdx: dataTag.currentIdx + 1
         })
      else
         setDataTag({
            ...dataTag,
            currentIdx: dataTag.currentIdx + 1,
         })
   }
   function handleClickIncrease() {
      setDataTag({
         ...dataTag,
         quantity: dataTag.quantity + 1
      })
   }

   function handleClickDecrease() {
      if (dataTag.quantity === 1) return;
      setDataTag({
         ...dataTag,
         quantity: dataTag.quantity - 1
      })
   }
   function handleClickDecreaseCart(idx, currentIdx) {
      const products = dataCart.products.map((item) => {
         if (item.currentIdxProduct === idx && item.currentIdx === currentIdx) {
            const quantity = item.quantity === 1 ? 1 : item.quantity - 1;
            return {
               ...item,
               quantity,
               totalPrice: item.price * quantity
            }
         }
         return item;
      })
      setDataCart({
         ...dataCart,
         products
      })
   }
   function handleClickIncreaseCart(idx, currentIdx) {
      const products = dataCart.products.map((item) => {
         if (item.currentIdxProduct === idx && item.currentIdx === currentIdx) {
            const quantity = item.quantity + 1;
            return {
               ...item,
               quantity,
               totalPrice: item.price * quantity
            }
         }
         return item;
      })
      setDataCart({
         ...dataCart,
         products
      })
   }
   
   function removeProduct(idx) {
      var products = [];
      dataCart.products.forEach((item, index) => {
         if (idx !== index) {
            products.push(item);
         }
      })
      setDataCart({
         ...dataCart,
         products
      })
   }

   function closeModal() {
      setShowModal(false);
   }
   function closeModalPayment() {
      setShowModalPayment(false);
   }
   function openModal(idx) {
      if (window.innerWidth > 800) {
         setShowModal(true);
         setDataTag({
            ...dataTag,
            currentIdx: dataTag.currentIdx,
            currentIdxProduct: idx,
            quantity: 1,
         })
      }
   }
   function openModalPayment(dataCart) {
      if (window.innerWidth > 800) {
         setShowModalPayment(true);
         // setDataTag({
         //    ...dataTag,
         //    currentIdx: dataTag.currentIdx,
         //    currentIdxProduct: idx,
         //    quantity: 1,
         // })
      }
   }
   function closeCart() {
      setShowCart(false);
   }
   function openCart() {
      setShowCart(true);
   }
   function addToCart(value = dataTag.quantity, currentIdx = dataTag.currentIdx, currentIdxProduct = dataTag.currentIdxProduct) {
      var isEmptyOrNull = true;
      const products = dataCart.products.map((item) => {
         if (item.currentIdx === currentIdx) {
            if (item.currentIdxProduct === currentIdxProduct) {
               isEmptyOrNull = false;
               return {
                  ...item,
                  quantity: item.quantity + value,
                  totalPrice: (item.quantity + value) * item.price
               }
            }
         }
         return item;
      })
      if (isEmptyOrNull)
         products.push({
            currentIdx: currentIdx,
            currentIdxProduct: currentIdxProduct,
            quantity: value,
            price: dataTag.data[currentIdx].products[currentIdxProduct].price,
            totalPrice: dataTag.data[currentIdx].products[currentIdxProduct].price * value,
            productID: dataTag.data[currentIdx].products[currentIdxProduct].productID,
            name: dataTag.data[currentIdx].products[currentIdxProduct].name
         })
      setDataCart({
         ...dataCart,
         products
      })
      closeModal();
   }
   function format(n, currency) {
      if (n && currency)
          return n.toFixed(0).replace(/./g, function (c, i, a) {
              return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
          }) + currency;
   }
   async function handlePayment() {
      try {
         if(payments == "online"){
            navigate('/paymentonline')
         }
         if(payments == "offline"){
            navigate('/paymentoffline')
         }
         const info = verifyToken();
         var email = '';
         var phone ='';
         var address ='';
         if (info) {
            await info.then(res => {
               email = res.data.email;
            })
         }
         var data = {
            email: email,
            total: dataCart.totalOrder,
            payment: payments,
            products: dataCart.products.map((item) => {
               const {
                  quantity,
                  price,
                  totalPrice,
                  name,
                  productID
               } = item;
               return {
                  quantity,
                  price,
                  totalPrice,
                  name,
                  productID
               }
            })
         }
         const socket = socketClient(SERVER);
         socket.emit('postOrder', data, (res) => {
            if (res.success) {
               socket.on(`${res.orderId}`, (status) => {
                  localStorage.setItem('ORDER', null);
                  socket.disconnect();
                  // if (status === 'confirmed') navigate('/profile');
                  // else if (status === 'cancel') setMessage('Đơn hàng của bạn đã bị hủy bởi đầu bếp');
               })
            }
            else {
               setMessage('Đơn hàng gửi lên bị lỗi');
            }
         });
      }
      catch (err) {
         console.log(err)
      }
   }
   return (
      
      message ?
         <div className='message'>
            <h1>{message}</h1>
         </div>
         :
         (
          <div className={clsx(styles.container)}>
            <div className={clsx(styles.menuContainer)}>
            <div className={clsx(styles.header)}>
              <div className={clsx(styles.homeIcon)}>
                  <Link to="/">
                    <HomeIcon />
                  </Link>
              </div>
              <div className={clsx(styles.content)}>Trang chủ</div>
              <div className={clsx(styles.takeCart)} style={{ marginRight: 35 }} onClick={() => openCart()}s>
                <ShoppingCartIcon/>
                <span>({dataCart.products.length})</span>
              </div>
            </div>

            <Menubody data={dataTag.data}
                  start={dataTag.start}
                  end={dataTag.end}
                  currentIdx={dataTag.currentIdx}
                  onclicknextbtn={onclicknextbtn} onclickprevbtn={onclickprevbtn}
                  handleClickTag={handleClickTag}
                  addToCart={addToCart}
                  openModal={openModal}>
            </Menubody>

               {showModal && (
                  <div className={clsx(styles.dialogWrapper, { open: showModal })} onClick={() => closeModal()}>
                    <div className={clsx(styles.dialogInformation)} onClick={(e) => e.stopPropagation()}>
                      <div className={clsx(styles.dialogTitle)}>
                        <p>
                          <strong>Chi tiết sản phẩm</strong>
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => closeModal()}
                        >
                          <strong>X</strong>
                        </p>
                      </div>
                      <div className={clsx(styles.dialogDetails)}>
                        <div className={clsx(styles.dialogImage)}>
                          <img src={dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.imgURL} alt="" />
                        </div>
                        <div className={clsx(styles.dialogProductInformation)}>
                          <table style={{ width: "100%" }} className>
                            <tr>
                              <td>SKU&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                              <td>{dataTag.data[dataTag.currentIdx].type}</td>
                              <td style={{ textAlign: "right" }}>Đơn giá</td>
                            </tr>
                            <tr style={{ height: 50 }}>
                              <td>401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                              <td>{dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.name}</td>
                              <td
                                style={{
                                  textAlign: "right",
                                  color: "red",
                                  fontSize: 22,
                                }}
                              >
                                <strong>{format(dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.price, 'đ')}</strong>
                              </td>
                            </tr>
                          </table>
                          <div className={clsx(styles.dialogQuantity)}>
                            Số lượng
                            <p
                              style={{
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <p
                                className={styles.dialogDecrease}
                                onClick={() => handleClickDecrease()}
                              >
                                -
                              </p>
                              <p style={{ padding: 20 }}>{dataTag.quantity}</p>
                              <p
                                className={styles.dialogIncrease}
                                onClick={() => handleClickIncrease()}
                              >
                                +
                              </p>
                            </p>
                          </div>
                          <p style={{ paddingTop: 20 }}>
                            <strong>Mô tả món ăn:&ensp;&nbsp;</strong>
                            <strong style={{ color: "rgba(0,0,0,0.3)" }}>
                            {dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.description}
                            </strong>
                          </p>
                          
                          
    
                          <div className={clsx(styles.addToCart)}>
                            <button
                              style={{
                                width: "70%" ,
                                fontSize: "1.6rem",
                                height: "30%"
                              }}
                              onClick={() => addToCart()}
                            >
                              <FaShoppingCart />
                              &ensp;&nbsp;Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )}

              {showModalPayment && (
               <div className={clsx(styles.dialogWrapper, { open: showModalPayment })} onClick={() => closeModalPayment()}>
                 <div className={clsx(styles.dialogInformation)} onClick={(e) => e.stopPropagation()}>
                   <div className={clsx(styles.dialogTitle)}>
                     <p>
                       <strong>Thanh toán</strong>
                     </p>
                     <p
                       style={{ cursor: "pointer" }}
                       onClick={() => closeModalPayment()}
                     >
                       <strong>X</strong>
                     </p>
                   </div>
                   <div className={clsx(styles.dialogDetails)}>
                     <div className={clsx(styles.dialogProductInformation)}>
                       <table style={{ width: "100%" }} className>
                         <tr>
                           <td>Tên món ăn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                           <td>Số lượng</td>
                           <td>Đơn giá</td>
                           <td style={{ textAlign: "right" }}>Tiền</td>
                         </tr>
                         
                        {dataCart.products.map((item, idx) => {
                           {
                              return (
                              (
                                 <tr style={{ height: 50 }}>
                                    <td>{item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                    <td>{item.quantity}</td>
                                    <td>{format(item.price, 'đ')}</td>
                                    <td
                                    style={{
                                       textAlign: "right",
                                       
                                       fontSize: 19,
                                    }}
                                    >
                                    <strong>{format(item.totalPrice, 'đ')}</strong>
                                    </td>
                                 </tr>  
                              )
                        )
                        }    
                        })}                   
                       </table>
                       <div className={clsx(styles.dialogQuantity)}>
                       Tổng đơn
                       <p
                         style={{
                           textAlign: "left",
                           display: "flex",
                           alignItems: "center",
                         }}
                       >
                        <p style={{
                           textAlign: "right",
                           color: "red",
                           fontSize: 30,
                         }}>{format(dataCart.totalOrder, 'đ')}</p>
                         </p>
                        </div>

                       <p style={{ paddingTop: 20 }}>
                         <strong>Email:&ensp;&nbsp;</strong>
                         <strong style={{ color: "rgba(0,0,0,0.3)" }}>
                           {profile.email}
                         </strong>
                       </p>
                       <p style={{ paddingTop: 20 }}>
                         <strong>Phone:&ensp;&nbsp;</strong>
                         <strong style={{ color: "rgba(0,0,0,0.3)" }}>
                         {profile.phone}
                         </strong>
                       </p>
                       <p style={{ paddingTop: 20 }}>
                         <strong>Address:&ensp;&nbsp;</strong>
                         <strong style={{ color: "rgba(0,0,0,0.3)" }}>
                         {profile.address}
                         </strong>
                       </p>
                       <p style={{ paddingTop: 20 }}>
                         <strong>Hình thức:&ensp;&nbsp;</strong>
                         <strong style={{ color: "rgba(0,0,0,0.3)" }}>
                           <Select
                              value = {payments}
                              labelId="role-select"
                              variant="outlined"
                              onChange={(e) => {
                                 setPayment(e.target.value)
                              }}
                           >
                              <MenuItem value="online" style={{ fontSize: "14px" }}>
                                 Online bằng QR code
                              </MenuItem>
                              <MenuItem value="offline" style={{ fontSize: "14px" }}>
                                 Thanh toán khi nhận hàng
                              </MenuItem>
                           </Select>
                         </strong>
                       </p>
                        
                       <div className={clsx(styles.addToCart)}>
                         <button
                           style={{
                             width: "70%" ,
                             fontSize: "1.6rem",
                             height: "30%"
                           }}
                           onClick={handlePayment}
                         >
                           <FaMoneyBill />
                           &ensp;&nbsp; {"Xác nhận thanh toán"}
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
           )}
           
               
               

               {showCart && (<div className={clsx(styles.cartWrapper,{ cartOpen: showCart })}>
                  <div className={clsx(styles.cartContainer)}>

                    <div className={clsx(styles.cartHeader)}>
                      <p className={clsx(styles.yourCart)}>
                        <span
                          style={{
                            color: "red",
                            fontSize: 25,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaShoppingCart />
                          &ensp;&nbsp;
                        </span>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Giỏ hàng({dataCart.products.length})
                        </span>
                      </p>
                      <p className={clsx(styles.diveIn)} onClick={() => closeCart()}>
                        CLOSE
                      </p>
                    </div>

                    <div className={clsx(styles.cartItems)}>
                      {dataTag.data.length !== 0 && dataCart.products.map((item, idx) => {
                        {
                          return (
                           (
                            <div key={idx} className={clsx(styles.cartItem)}>
                              <div className={clsx(styles.cartImageItem)}>
                                <img src={dataTag.data[item.currentIdx].products[item.currentIdxProduct].imgURL} alt="" />
                              </div>
                              <div className={clsx(styles.cartQuantity)}>
                                <p style={{ marginBottom: 15 }}>1. {dataTag.data[item.currentIdx].products[item.currentIdxProduct].name}</p>
                                <p
                                  style={{
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p
                                    className={styles.dialogDecrease}
                                    onClick={() => {
                                      handleClickDecreaseCart(item.currentIdxProduct, item.currentIdx)
                                   }}
                                  >
                                    -
                                  </p>
                                  <p style={{ padding: "0 20px" }}>
                                    {item.quantity}
                                  </p>
                                  <p
                                    className={styles.dialogIncrease}
                                    onClick={() => {
                                      handleClickIncreaseCart(item.currentIdxProduct, item.currentIdx)
                                   }}
                                  >
                                    +
                                  </p>
                                </p>
                              </div>
                              <div className={clsx(styles.cartCost)}>
                                <p
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                  }}
                                >
                                  {format(item.totalPrice, 'đ')}
                                </p>
                                <RemoveCircleOutlineIcon className='product-close' onClick={() => removeProduct(idx)} />
                              </div>
                            </div>
                          ));
                          }
                      })}
                    </div>

                    <div className={clsx(styles.cartTotalCost)}>
                      <p style={{ fontSize: 20, fontWeight: "bold" }}>Total: </p>
                      <p>
                        <p
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "red",
                            textAlign: "right",
                          }}
                        >
                          {dataCart.totalOrder ? format(dataCart.totalOrder, 'đ') : 'đ0'}
                        </p>
                      </p>
                    </div>
                    <div className={clsx(styles.cartPayment,{ open: showModalPayment })} onClick={() => openModalPayment()}>Thanh toán</div>

                  </div>
                </div>
               )}            

         </div>
         
              
        </div>
         )
   )
}