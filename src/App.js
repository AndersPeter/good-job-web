import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Stars from "./pages/Stars";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import SendStar from "./pages/SendStar";

function App() {
  return (
    <>
      <div className="font-mono bg-emerald-300 m-0 p-0 box-border min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Stars />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/send-star" element={<SendStar />} />
          </Routes>
          <Navbar />
        </Router>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
