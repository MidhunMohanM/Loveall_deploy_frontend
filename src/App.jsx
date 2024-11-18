import React from "react";
import AppRoute from "./route";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PopUpProvider from "./context/PopUpProvider";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

// Separate layout logic
function Layout() {
  const location = useLocation(); // Now inside Router context
  const showHeader = !location.pathname.includes('/business');

  return (
    <>
      {showHeader && <Header />}
      <AppRoute />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PopUpProvider>
        <Router>
          <Layout />
        </Router>
      </PopUpProvider>
    </AuthProvider>
  );
}
