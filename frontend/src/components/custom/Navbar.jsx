import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "../../components/ui/button";
import BlueCreateWalletButton from "./walletutils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isHidden, setisHidden] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(null); // State to track sign-in status
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    setIsSignedIn(localStorage.getItem("wallet"));
  }, []); // Dependency array to ensure this runs once on mount

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setisHidden(diff > 0);
      lastYRef.current = y;
    }
  });

  // Handlers for wallet events
  const handleSuccess = (address) => {
    alert(`Wallet connected: ${address}`);
    localStorage.setItem("wallet", address);
    setIsSignedIn(true); // Update sign-in status on success
  };

  const handleError = (error) => {
    alert(`Error: ${error.message}`);
  };

  // Handle Dashboard Button Click
  const handleDashboardClick = () => {
    if (isSignedIn) {
      navigate("/dashboard"); // Redirect to the dashboard route
    } else {
      alert("Please sign in first!");
    }
  };

  return (
    <motion.nav
      className="navbar-container flex justify-around items-center w-full h-20 bg-transparent z-50 bg-black"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
    >
      <motion.div
        animate={isHidden ? "hidden" : "visible"}
        onFocusCapture={() => setisHidden(false)}
        whileHover="visible"
        variants={{
          hidden: { y: "-100%" },
          visible: { y: "0%" },
        }}
        transition={{ duration: 0.3 }}
        className="nav-list w-fit h-16 z-20 px-8 gap-3 list-none flex flex-row justify-center items-center fixed rounded-full border border-neutral-700 bg-gray-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-black"
      >
        <h1 className="font-LindedHill text-lg">Mirror Sphere</h1> |
        <Button variant="ghost">Home</Button> |
        <Button variant="ghost">Features</Button> |
        <Button variant="ghost">Steps</Button> |
        <Button variant="ghost" onClick={handleDashboardClick}>
          {isSignedIn ? "Dashboard" : <BlueCreateWalletButton handleSuccess={handleSuccess} handleError={handleError} />}
        </Button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
