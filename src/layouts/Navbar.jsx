import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/login" className="logo"></Link>
    </nav>
  );
};
