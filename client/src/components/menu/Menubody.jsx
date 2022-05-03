import React from 'react';
import Grid from '@mui/material/Grid'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './menu.scss';
import styles from "./Menu.module.css";
import clsx from "clsx";
import {
  FaHome,
  FaShoppingCart,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
const classNames = require('classnames');

export default function Menubody(props) {
    console.log(props.data)
    // function format(n, currency) {
    //     return currency + n.toFixed(0).replace(/./g, function (c, i, a) {
    //         return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    //     });
    // }
    function format(n, currency) {
      if (n && currency)
          return n.toFixed(0).replace(/./g, function (c, i, a) {
              return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
          }) + currency;
  }
    return (
      <div className={clsx(styles.mid)}>
        <div style={{ position: 'relative' }}>
              <div className={clsx(styles.categories)}>
                <div
                  className={classNames('prev-btn', { disable: (() => props.currentIdx === 0 ? true : false)() })} onClick={() => props.onclickprevbtn()}
                  style={{
                    alignSelf: "center",
                    fontSize: 40,
                    cursor: "pointer",
                    marginLeft: 0,
                    marginRight: 0
                  }}
                >
                  <FaAngleLeft />
                </div>
                {props.data.map((item, idx) => {
                  var isCur = false;
                  if (props.currentIdx === idx) isCur = true;
                  if (idx >= props.start && idx <= props.end) return (
                    <div
                      key={idx}
                      className={clsx(styles.itemCategory,{ currentTag: isCur })}
                      style={
                        isCur ? { backgroundColor: "#2c3a57", color: "#fff" }
                          : {}
                      }
                      onClick={(e) => props.handleClickTag(idx)}
                    >
                      <div className={clsx(styles.categoryWrapperImg)}>
                        <img src={item.imgURL} alt="" />
                      </div>
                      <p>{item.type}</p>
                  
                    </div>
                  )
                  return null
                })}
                <div
                  className={classNames('next-btn', { disable: (() => props.data.length - 1 === props.currentIdx ? true : false)() })} onClick={() => props.onclicknextbtn()}
                  style={{
                    alignSelf: "center",
                    fontSize: 40,
                    cursor: "pointer",
                    position: "absolute",
                    marginLeft: 0,
                    right: "0",
                    top: 'calc(50% - 20px)'
                  }}
                >
                  <FaAngleRight />
                </div>
              </div>

             
        
                 
          <div className={clsx(styles.listFood)}>
            <label className={clsx(styles.title)}>
              <span>{props.data.length !== 0 && props.data[props.currentIdx].type}</span>
            </label>
            <div className={clsx(styles.itemsFood)}>
              {props.data.length !== 0 && props.data[props.currentIdx].products.map((item, idx) => {
                {
                  return (
                    (
                      <div
                        key={idx}
                        className={clsx(styles.itemFood)}
                        onClick={() => props.openModal(idx)}
                      >
                        <img src={item.imgURL} alt="" />
                        <div className={clsx(styles.details)}>
                          <p>1. {item.name}</p>
                          <div className={clsx(styles.cost)}>
                            <p className={clsx(styles.money)}>
                              {format(item.price, 'đ')}
                            </p>
                            <p className={clsx(styles.cart)} onClick={(e) => {
                                              e.stopPropagation();props.addToCart(1, props.currentIdx, idx);
                                            }}>
                              <FaShoppingCart />
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  );
                }
              })
              }        
            </div>
          </div>
        </div>
      </div>      
    )
}