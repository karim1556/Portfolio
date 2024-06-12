import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); 
  };

  // Apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); 

  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); 

  return (
    <header className="header flex justify-between items-center p-4 bg-base-200">
      <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
        <p className="blue-gradient_text">KS</p>
      </NavLink>
      <nav className="flex text-lg gap-10 font-medium">
        <NavLink to="/about" className="text-black">
          About
        </NavLink>
        <NavLink to="/project" className="text-black">
          Projects
        </NavLink>
        <NavLink to="/blog" className="text-black">
          Blog
        </NavLink>
      </nav>
      <button className="flex items-center justify-center w-9 h-9 bg-slate-300 rounded-lg" onClick={toggleTheme}>
        {theme === "light" ? <BsSun className="text-yellow-600" /> : <BsMoon className="text-blue-500" />}
      </button>
    </header>
  );
};

export default Navbar;
