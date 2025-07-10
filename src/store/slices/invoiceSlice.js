import { createSlice } from "@reduxjs/toolkit";

function getInitialInvoices(username) {
  return JSON.parse(localStorage.getItem(`invoices_${username}`)) || [];
}

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    list: [],
  },
  reducers: {
    loadInvoices(state, action) {
      state.list = getInitialInvoices(action.payload); // username
    },

    addInvoice(state, action) {
      state.list.push(action.payload);
    },

    updateInvoice(state, action) {
      const { invoiceNumber, updated } = action.payload;
      const index = state.list.findIndex(
        (inv) => inv.invoiceNumber === invoiceNumber
      );
      if (index !== -1) {
        state.list[index] = updated;
      }
    },

    deleteInvoice(state, action) {
      state.list.splice(action.payload, 1);
    },

    syncLocalStorage(state, action) {
      const username = action.payload;
      localStorage.setItem(`invoices_${username}`, JSON.stringify(state.list));
    },
  },
});

export const {
  loadInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  syncLocalStorage,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
