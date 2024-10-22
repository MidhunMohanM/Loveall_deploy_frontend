import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Registration2 from "./pages/ToRegister";
import OTPSent from './pages/OTPSent';
import Offer from "./pages/Offer";
import SingleOffer from "./pages/singleOffer";
import Redeem from "./pages/Redeem";
import About from "./pages/About";
import Charity from "./pages/Charity";
import Donation from "./pages/Donation";
import Volunteer from "./pages/Volunteer";
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import EditPersonalInfo from './pages/EditPersonalInfo';
import EditAddress from './pages/EditAddress';
import Security from './pages/Security';
import CustomerSupport from './pages/CustomerSupport';
import LoyaltyCardProfile from './pages/LoyaltyCardProfile';
// import PaymentGateway from './pages/PaymentGateway';

const AppRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/toregister" element={<Registration2 />} />
        <Route path="/otp-sent" element={<OTPSent />} />
        <Route path="/stores" element={<Offer />} />
        <Route path='/offer/:offer_id' element={<SingleOffer />} />
        <Route path='/redeem' element={<Redeem />} />
        <Route path="/about" element={<About />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/volunteer" element={<Volunteer />} />

        <Route path="/loyalty-card-profile" element={<LoyaltyCardProfile />} />

          {/* Payment Gateway */}
          {/* <Route path="/payment-gateway" element={<PaymentGateway />} /> */}

          {/* Profile and its sub-routes */}
          <Route path="/profile" element={<Profile />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="account/edit-personal-info" element={<EditPersonalInfo />} />
            <Route path="account/edit-address" element={<EditAddress />} />
            <Route path="security" element={<Security />} />
            <Route path="support" element={<CustomerSupport />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />

      </Routes>
  );
};

export default AppRoute;
