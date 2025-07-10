import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteInvoice, syncLocalStorage } from "../store/slices/invoiceSlice";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Invoices.module.css";
import { loadInvoices } from "../store/slices/invoiceSlice";

import deleteIcon from "../../icons/delete.png";
import editIcon from "../../icons/edit.png";

export default function Invoices() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const invoices = useSelector((state) => state.invoices.list);
  const navigate = useNavigate();

  function calculateTotal(products = []) {
    return products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  }

  function handleEdit(invoiceNumber) {
    navigate(`/invoices/edit/${invoiceNumber}`);
  }

  function handleDelete(invoiceNumber) {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;
    dispatch(deleteInvoice(invoiceNumber));
    dispatch(syncLocalStorage(user));
  }

  return (
    <section className={classes.content}>
      <div className={classes.head}>
        <h3 className={classes.header}>Invoices</h3>
        <button className={classes["save-button"]}>
          <Link to="/invoices/new">New Invoice</Link>
        </button>
      </div>
      <div className={classes.form}>
        <div className={classes["items-wrapper"]}>
          {invoices.length === 0 ? (
            <p className={classes["fallback-text"]}>No Invoices Found.</p>
          ) : (
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, index) => (
                  <tr key={inv.invoiceNumber}>
                    <td>{inv.invoiceNumber}</td>
                    <td>{inv.date}</td>
                    <td>{inv.customer}</td>
                    <td>₱{calculateTotal(inv.products)}</td>
                    <td className={classes["delete-wrapper"]}>
                      <img
                        src={deleteIcon}
                        className={classes["delete-icon"]}
                        onClick={() => handleDelete(index)}
                      />
                      <img
                        src={editIcon}
                        className={classes["edit-icon"]}
                        onClick={() => handleEdit(inv.invoiceNumber)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
