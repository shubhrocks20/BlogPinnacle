import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { LoginContext } from "./loginContext";
import Footer from "./components/Footer";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  return (
    <>
      <LoginContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
        <Header />
        <Outlet />
        <Footer />
      </LoginContext.Provider>
    </>
  );
};
export default App;
