import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./NewInvoice.module.css";
import deleteIcon from "../../icons/delete.png";

import { calculateSubtotal, calculateTotal } from "../utils/products";
import { addInvoice, syncLocalStorage } from "../store/slices/invoiceSlice";

export default function NewInvoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: "",
    customer: "",
    products: [{ name: "", quantity: 1, price: 0 }],
  });

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const invoices = useSelector((state) => state.invoices.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleProductChange(index, field, value) {
    const updated = [...invoice.products];
    updated[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value;
    setInvoice({ ...invoice, products: updated });
  }

  function addItem() {
    setInvoice({
      ...invoice,
      products: [...invoice.products, { name: "", quantity: 1, price: 0 }],
    });
  }

  function removeProduct(index) {
    if (invoice.products.length === 1) return;
    const updated = invoice.products.filter((_, i) => i !== index);
    setInvoice({ ...invoice, products: updated });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const duplicate = invoices.some(
      (inv) =>
        inv.invoiceNumber.trim().toLowerCase() ===
        invoice.invoiceNumber.trim().toLowerCase()
    );

    if (duplicate) {
      alert(
        "Invoice number already exists. Please use a unique invoice number."
      );
      return;
    }
    dispatch(addInvoice(invoice));
    dispatch(syncLocalStorage(user));
    navigate("/invoices");
  }

  return (
    <section className={classes.content}>
      <form onSubmit={handleSubmit}>
        <div className={classes.head}>
          <h3 className={classes.header}>New Invoice</h3>
          <div className={classes["buttons-wrapper"]}>
            <button className={classes["cancel-button"]}>
              <Link to="/invoices">Cancel</Link>
            </button>
            <button className={classes["save-button"]} type="submit">
              Save Invoice
            </button>
          </div>
        </div>
        <div className={classes.form}>
          <div className={classes["customer-details"]}>
            <div className={classes["input-wrapper"]}>
              <label>
                Invoice Number<span>*</span>
              </label>
              <input
                className={classes["customer-input"]}
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className={classes["input-wrapper"]}>
              <label>
                Invoice Date<span>*</span>
              </label>
              <input
                className={classes["customer-input"]}
                type="date"
                id="date"
                name="date"
                value={invoice.date}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className={classes["input-wrapper"]}>
              <label>
                Customer name<span>*</span>
              </label>
              <input
                className={classes["customer-input"]}
                type="text"
                id="customer"
                name="customer"
                value={invoice.customer}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className={classes["items-wrapper"]}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {invoice.products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className={classes.input}
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(index, "name", e.target.value)
                        }
                        required
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        className={classes.input}
                        type="number"
                        min={1}
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                        required
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        className={classes.input}
                        type="number"
                        min={0}
                        value={product.price}
                        onChange={(e) =>
                          handleProductChange(index, "price", e.target.value)
                        }
                        required
                        autoComplete="off"
                      />
                    </td>
                    <td>₱{calculateSubtotal(product)}</td>
                    <td className={classes["delete-wrapper"]}>
                      <img
                        onClick={() => removeProduct(index)}
                        src={deleteIcon}
                        className={classes["delete-icon"]}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>TOTAL</h3>
                  </td>
                  <td>
                    <h3 className={classes.total}>
                      ₱{calculateTotal(invoice)}
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={addItem} className={classes["add-item"]}>
              Add Item
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
