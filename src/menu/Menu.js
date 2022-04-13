import styles from "./Menu.module.css";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import clsx from "clsx";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import Cart from "./Cart";

const products = [
  ////fake call api
  {
    id: 1,
    name: "product 1",
    cost: 100.0,
    quantity: 3,
    photo: "",
    categoryID: "C1",
  },
  {
    id: 2,
    name: "product 2",
    cost: 120.01,
    quantity: 5,
    photo: "",
    categoryID: "C1",
  },
  {
    id: 3,
    name: "product 3",
    cost: 180.0,
    quantity: 9,
    photo: "",
    categoryID: "C1",
  },
  {
    id: 4,
    name: "product 4",
    cost: 160.5,
    quantity: 11,
    photo: "",
    categoryID: "C1",
  },
  {
    id: 5,
    name: "product 5",
    cost: 133.0,
    quantity: 0,
    photo: "",
    categoryID: "SF",
  },
];

const categories = [
  //fake call api
  {
    id: "C1",
    name: "Cupcake",
    photo: "",
  },
  {
    id: "SF",
    name: "Sea Food",
    photo: "",
  },
  {
    id: "J",
    name: "Juice",
    photo: "",
  },
  {
    id: "C2",
    name: "Coca",
    photo: "",
  },
  {
    id: "OJ",
    name: "Orange Juice",
    photo: "",
  },
];

function Menu() {
  const [checkDL, setCheckDL] = useState(false);
  const [productDialog, setProductDialog] = useState({});
  const [checkFocusCategory, setCheckFocusCategory] = useState(categories[0]);
  const [showCart, setShowCart] = useState(false);
  const [countQuantity, setCountQuantity] = useState(0);
  const [listProductInCart, setListProductInCart] = useState([]);

  const handleShowCart = useCallback(() => {
    setShowCart((showCart) => !showCart);
  }, []);

  useLayoutEffect(() => {
    if (countQuantity > productDialog.quantity) {
      setCountQuantity(productDialog.quantity);
    } else if (countQuantity === 0 && productDialog.quantity > 0) {
      setCountQuantity(1);
    } else if (countQuantity < 0) {
      setCountQuantity(0);
    }
  }, [countQuantity]);

  useEffect(() => {
    productDialog.quantity > 0 ? setCountQuantity(1) : setCountQuantity(0);
  }, [checkDL]);

  useLayoutEffect(() => {
      if(listProductInCart.length > 1)
      for (let i = 0; i < listProductInCart.length-1; i++) {
        if (listProductInCart[i].id === listProductInCart[listProductInCart.length - 1].id ) {
          listProductInCart.pop();
          if(listProductInCart[i].currentQuantity + countQuantity > listProductInCart[i].quantity){
            listProductInCart[i].currentQuantity = listProductInCart[i].quantity;
          }else{
            listProductInCart[i].currentQuantity= listProductInCart[i].currentQuantity + countQuantity;
          }
          setListProductInCart([...listProductInCart])
          break;
        }
      }
  }, [listProductInCart]);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.menuContainer)}>
        <div className={clsx(styles.header)}>
          <div className={clsx(styles.homeIcon)}>
            <FaHome />
          </div>
          <div className={clsx(styles.content)}>Back to home</div>
          <div className={clsx(styles.takeCart)} style={{ marginRight: 35 }}>
            {!showCart && <FaShoppingCart onClick={() => setShowCart(true)} />}
          </div>
        </div>
        <div className={clsx(styles.mid)}>
          <div className={clsx(styles.categories)}>
            <div></div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={clsx(styles.itemCategory)}
                style={
                  category === checkFocusCategory
                    ? { backgroundColor: "#2c3a57", color: "#fff" }
                    : {}
                }
                onClick={() => setCheckFocusCategory(category)}
              >
                <div className={clsx(styles.categoryWrapperImg)}>
                  <img src={category.photo} alt="" />
                </div>
                <p>{category.name}</p>
              </div>
            ))}

            <div></div>
          </div>
          <div className={clsx(styles.listFood)}>
            <label className={clsx(styles.title)}>
              {checkFocusCategory.name}
            </label>
            <div className={clsx(styles.itemsFood)}>
              {products.map((product) => {
                {
                  return (
                    checkFocusCategory.id === product.categoryID && (
                      <div
                        key={product.id}
                        className={clsx(styles.itemFood)}
                        onClick={() => {
                          setCheckDL((prev) => true);
                          setProductDialog((prevProduct) => product);
                        }}
                      >
                        <img src={product.photo} alt="" />
                        <div className={clsx(styles.details)}>
                          <p>1. {product.name}</p>
                          <div className={clsx(styles.cost)}>
                            <p className={clsx(styles.money)}>
                              Kr {product.cost}
                            </p>
                            <p className={clsx(styles.cart)}>
                              <FaShoppingCart />
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  );
                }
              })}
            </div>
          </div>
        </div>
        {checkDL && (
          <div className={clsx(styles.dialogWrapper)}>
            <div className={clsx(styles.dialogInformation)}>
              <div className={clsx(styles.dialogTitle)}>
                <p>
                  <strong>ADD TO CART</strong>
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCheckDL(false);
                  }}
                >
                  <strong>X</strong>
                </p>
              </div>
              <div className={clsx(styles.dialogDetails)}>
                <div className={clsx(styles.dialogImage)}>
                  <img src={productDialog.photo} alt="" />
                </div>
                <div className={clsx(styles.dialogProductInformation)}>
                  <table style={{ width: "100%" }} className>
                    <tr>
                      <td>SKU&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                      <td>{productDialog.name}</td>
                      <td style={{ textAlign: "right" }}>Unit Price</td>
                    </tr>
                    <tr style={{ height: 50 }}>
                      <td>401&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                      <td>Burger</td>
                      <td
                        style={{
                          textAlign: "right",
                          color: "red",
                          fontSize: 22,
                        }}
                      >
                        <strong>kr {productDialog.cost}</strong>
                      </td>
                    </tr>
                  </table>
                  <div className={clsx(styles.dialogQuantity)}>
                    Quantity
                    <p
                      style={{
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p
                        className={styles.dialogDecrease}
                        onClick={() => setCountQuantity(countQuantity - 1)}
                      >
                        -
                      </p>
                      <p style={{ padding: 20 }}>{countQuantity}</p>
                      <p
                        className={styles.dialogIncrease}
                        onClick={() => setCountQuantity(countQuantity + 1)}
                      >
                        +
                      </p>
                    </p>
                  </div>
                  <p style={{ paddingTop: 20 }}>
                    <strong>Protein:&ensp;&nbsp;</strong>
                    <strong style={{ color: "rgba(0,0,0,0.3)" }}>
                      What is Lorem ipsum?
                    </strong>
                  </p>
                  <p style={{ paddingTop: 20 }}>
                    <strong>Additives:&ensp;&nbsp;</strong>
                    <strong style={{ color: "rgba(0,0,0,0.3)" }}>03</strong>
                  </p>
                  <p style={{ paddingTop: 20 }}>
                    <strong>Baking material:&ensp;&nbsp;</strong>
                    <strong style={{ color: "rgba(0,0,0,0.3)" }}>040</strong>
                  </p>
                  <p style={{ paddingTop: 20 }}>
                    <strong>Food decoration:&ensp;&nbsp;</strong>
                    <strong style={{ color: "rgba(0,0,0,0.3)" }}>04</strong>
                  </p>
                  <p className={clsx(styles.dialogSideDishes)}>
                    <p style={{ fontWeight: "bold", fontSize: 20 }}>
                      Side dishes (<strong style={{ color: "red" }}>*</strong>)
                    </p>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      Selected quantity 0
                    </p>
                  </p>
                  <span
                    style={{ fontStyle: "italic", color: "rgba(0,0,0,0.3)" }}
                  >
                    Please select on of the properties below
                  </span>
                  <p
                    style={{
                      marginTop: 20,
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <div className={clsx(styles.checkbox)}>
                      <input type="checkbox" id="check" name="" value="" />
                      <label className={clsx(styles.label)} htmlFor="check">
                        &ensp;&nbsp;Vegetables
                      </label>
                    </div>
                  </p>
                  <div className={clsx(styles.addToCart)}>
                    <button
                      onClick={() => {
                        setCheckDL((prev) => false);
                        setListProductInCart((prev) => [
                          ...prev,
                          { ...productDialog, currentQuantity: countQuantity },
                        ]);
                      }}
                    >
                      <FaShoppingCart />
                      &ensp;&nbsp;Kr {countQuantity * productDialog.cost}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCart && (
        <Cart onShowCart={handleShowCart} listProduct={listProductInCart} />
      )}
    </div>
  );
}

export default Menu;
