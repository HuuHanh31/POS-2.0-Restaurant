import styles from "./Payment.module.css";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa";
function Payment({changeApp}) {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.homeIcon)} onClick={()=>changeApp()}>
          <FaArrowLeft />
        </div>
        <div className={clsx(styles.content)} >Back</div>
        <div className={clsx(styles.title)} style={{ marginRight: 35 }}>
          PAYMENT
        </div>
        <div style={{ display: "flex", color: "#999" }}>
          Home <li style={{ marginLeft: 17 }}></li>
        </div>
        <div style={{ marginRight: 40 }}>Payment</div>
      </div>
      <div className={clsx(styles.bodyWrapper)}>
        <div style={{ width: "33%" }}>
          <div className={clsx(styles.business)}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Business name</strong>
              <strong>25.00 NOK</strong>
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13 }}>1 item (expand)</span>
              <span style={{ fontSize: 13 }}>inc. VAT</span>
            </p>
          </div>
        </div>
        <div className={clsx(styles.creditCardTitle)}>
          <div className={clsx(styles.cardNotification)}>
            Checkout is running in text mode. Click here for test data
            <div
              style={{
                position: "absolute",
                top: 3,
                right: 5,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              x
            </div>
          </div>
          <div className={clsx(styles.cardType)}>
            <div className={clsx(styles.logoWrapper)}>
              <p className={clsx(styles.logo)}></p>
              Creadit Card&nbsp;
              <p
                style={{
                  fontSize: 12,
                  alignSelf: "center",
                  fontWeight: "normal",
                }}
              >
                {" "}
                - credit or debit
              </p>
            </div>
            <div className={clsx(styles.visaImage)}>
              <img
                src="https://logowik.com/content/uploads/images/857_visa.jpg"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
              <p className={clsx(styles.masterCard)}></p>
            </div>
          </div>
        </div>
        <div className={clsx(styles.mainCard)}>
          <form>
            <input className={clsx(styles.inputCard)} type="text" />
            <br></br>
            <div
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                marginBottom: 20,
              }}
            >
              <input className={clsx(styles.inputCard)} type="text" />
              <input
                className={clsx(styles.inputCard)}
                style={{ marginLeft: 10 }}
                type="text"
              />
            </div>
            <button className={clsx(styles.checkout)}>Pay NOK 25.00</button>
          </form>
        </div>
        <div className={clsx(styles.cardCancel)}>Cancel payment</div>
        <div className={clsx(styles.languages)}>
          <p style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                height: 15,
                width: 20,
                objectFit: "cover",
                borderRadius: 4,
              }}
              src="data:image/png;base64,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"
            />
            <strong style={{fontSize: 12, color:'#0061a1', display: 'flex', alignItems: "end"}}>&nbsp;Dintenro
             <p style={{fontSize: 8, color:'#0061a1', marginBottom: 1}}>&nbsp;&nbsp;CHECKOUT</p>
            </strong>       
          </p>
          <p style={{fontSize: 13, color:'#0061a1'}}>Terms</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
