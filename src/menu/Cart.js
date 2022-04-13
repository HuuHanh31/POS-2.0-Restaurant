import { memo } from "react";
import styles from "./Menu.module.css";
import clsx from "clsx";
import { FaHome, FaShoppingCart } from "react-icons/fa";

function Cart({ onShowCart, listProduct }) {
  return (
    <div className={clsx(styles.cartWrapper)}>
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
              Your Cart ({listProduct.length})
            </span>
          </p>
          <p className={clsx(styles.diveIn)} onClick={onShowCart}>
            DINE IN
          </p>
        </div>
        <div className={clsx(styles.cartItems)}>
          {listProduct.map((product) => (
            <div key={product.id} className={clsx(styles.cartItem)}>
              <div className={clsx(styles.cartImageItem)}>
                <img src={product.photo} alt="" />
              </div>
              <div className={clsx(styles.cartQuantity)}>
                <p style={{ marginBottom: 15 }}>1. {product.name}</p>
                <p
                  style={{
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className={styles.dialogDecrease}>-</p>
                  <p style={{ padding: "0 20px" }}>{product.currentQuantity}</p>
                  <p className={styles.dialogIncrease}>+</p>
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
                  Kr {product.currentQuantity * product.cost}
                </p>
                <p style={{ fontSize: 10, width: "fit-content" }}>
                  (Incl. tax 10% = Kr 12,30)
                </p>
              </div>
            </div>
          ))}
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
              Kr {listProduct.reduce((total, curr) => total + curr.cost * curr.currentQuantity, 0)}
            </p>
            <span style={{ fontSize: 12, width: "fit-content" }}>
              (Incl. tax 10% = Kr 12,30)
            </span>
          </p>
        </div>
        <div className={clsx(styles.cartPayment)}>PAYMENT</div>
      </div>
    </div>
  );
}

export default memo(Cart);
