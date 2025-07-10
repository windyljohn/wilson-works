import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices } from "./store/slices/invoiceSlice";
import { loadUser } from "./store/slices/authSlice";

import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import NewInvoice from "./pages/NewInvoice";
import { useNavigate } from "react-router-dom";
import Invoices from "./pages/Invoices";
import EditInvoice from "./pages/EditInvoice";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const user = useSelector((state) => state.auth.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadInvoices(user));
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Invoices />} />
        <Route path="new" element={<NewInvoice />} />
        <Route path="/invoices/edit/:invoiceNumber" element={<EditInvoice />} />
      </Route>

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
