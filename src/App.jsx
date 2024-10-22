import React from "react";
import AppRoute from "./route";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PopUpProvider from "./context/PopUpProvider";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <PopUpProvider>
        <Router>
          <Header />
          <AppRoute />
          <Footer />
        </Router>
      </PopUpProvider>
    </AuthProvider>
  );
}
