import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateInvoice, syncLocalStorage } from "../store/slices/invoiceSlice";

import classes from "./NewInvoice.module.css"; // reuse styles
import deleteIcon from "../../icons/delete.png";

export default function EditInvoice() {
  const { invoiceNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const invoices = useSelector((state) => state.invoices.list);

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    invoices.map((inv) => console.log(inv, invoiceNumber));
    const existing = invoices.find((inv) => inv.invoiceNumber == invoiceNumber);

    if (existing) {
      setInvoice({ ...existing });
    } else {
      alert("Invoice not found.");
      navigate("/invoices");
    }
  }, []);

  function handleChange(e) {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleProductChange(index, field, value) {
    const updated = invoice.products.map((product, i) =>
      i === index
        ? {
            ...product,
            [field]:
              field === "quantity" || field === "price" ? Number(value) : value,
          }
        : product
    );
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

  function calculateSubtotal(p) {
    return p.quantity * p.price;
  }

  function calculateTotal() {
    return invoice.products.reduce((sum, p) => sum + calculateSubtotal(p), 0);
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(updateInvoice({ invoiceNumber, updated: invoice }));
    dispatch(syncLocalStorage(user));
    navigate("/invoices");
  }

  if (!invoice) {
    return <p>Loading invoice...</p>;
  }

  return (
    <section className={classes.content}>
      <form onSubmit={handleSubmit}>
        <div className={classes.head}>
          <h3 className={classes.header}>Edit Invoice</h3>
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
                    <h3 className={classes.total}>₱{calculateTotal()}</h3>
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
