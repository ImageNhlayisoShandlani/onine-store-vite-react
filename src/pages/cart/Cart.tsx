import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../../app/store";
import { Link } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

export default function Cart() {
  const cart = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart({ id: productId }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    toast.success("Paid");
    dispatch(clearCart());
    setTimeout(() => {handleClose();}, 3000)
  };
  const total = cart.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );


  useEffect(() => {}, [cart]);
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-secondary">Go Back to Shop</Link>
        </div>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: any) => (
                <tr key={item.product.id}>
                  <td>{item.product.title}</td>
                  <td>
                    <img src={item.product.image} alt={item.product.title} style={{ width: "50px" }} />
                  </td>
                  <td>R {item.product.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>R {(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.product.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Total: R {total.toFixed(2)}</h4>
            <div>
              <button className="btn btn-warning" onClick={() => dispatch(clearCart())}>Clear Cart <i className="fa-solid fa-trash"></i></button>
              <br />
              <br />
              <button className="btn btn-success" onClick={(e) => {
                e.preventDefault();
                if (!user) {
                  toast.error("Please login to checkout cart!!!")

                  //setTimeout(() => window.location.href = "/login", 3000);

                  return;
                }
                handleClickOpen();
              }}>Checkout <i className="fa-solid fa-credit-card"></i></button>
            </div>

            <Dialog onSubmit={handleSubmit} open={open}>
              <DialogTitle>Check Out</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter Card Details to pay R {total}
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    required
                    id="name"
                    name=""
                    label="Full Name"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    name=""
                    label="Card No."
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    name=""
                    label="CVV"
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    label="Expiry Date"
                    type="month"
                    fullWidth
                    variant="standard"
                  />
                  <DialogActions>
                    <Button onClick={handleClose}>Continue Shopping</Button>
                    <Button type="submit">Pay</Button>
                  </DialogActions>
                </form>

              </DialogContent>
            </Dialog>
          </div>

        </>
      )}
    </div>
  );
}
