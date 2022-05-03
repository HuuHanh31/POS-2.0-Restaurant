import classNames from "classnames";
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useState, useRef } from "react";
import shortid from 'shortid'
import axios from "axios";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./Popup.scss"

const SERVER = "http://localhost:4000/";
function format(n, currency) {
  if (n && currency)
      return n.toFixed(0).replace(/./g, function (c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      }) + currency;
}

export default function Popup(props) {
  const [content, setContent] = useState(props.data);
  console.log(content);
  const [flag, setFlag] = useState(false);
  const ADD_NEW = -1;
  const newDishRef = useRef();
  function scrollToBottom() {
    newDishRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="am-modal open">
      <div className="am-form">
        <div className="am-form-header">
          
            <h2>Món ăn trong đơn hàng</h2>
        
          <div>
            <Button
              color="secondary"
              variant="contained"
              onClick={props.closeModal}
            >
              Huỷ
            </Button>
          </div>
        </div>

        <div className="am-form-add">
          <h3>OrderID</h3>
          <TextField
            required
            defaultValue={content.orderID}
            variant="outlined"
            margin="dense"
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
        </div>

        {content.products.map((product, idx) => (
          <div key={product.productID} className="am-product">
            <TextField
              label="Tên"
              defaultValue={product.name}
              variant="outlined"
              margin="dense"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              onChange={(e) =>
                setContent({
                  ...content,
                  products: content?.products?.map((p) =>
                    p.productID === product.productID
                      ? { ...p, name: e.target.value }
                      : p
                  ),
                })
              }
            />
            <TextField
              label="Số lượng"
              defaultValue={product.quantity}
              variant="outlined"
              margin="dense"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              label="Giá"
              defaultValue={format(product.price , 'đ')}
              variant="outlined"
              margin="dense"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              label="Tổng giá"
              defaultValue={format(product.totalPrice , 'đ')}
              variant="outlined"
              margin="dense"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
          </div>
        ))}
        <div ref={newDishRef}></div>
      </div>
    </div>
  );
}