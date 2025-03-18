import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../assets/icons/search.svg";
import CartIcon from "../assets/icons/shopping-bag.svg";

interface NavbarProps {
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onCartClick,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <nav className="w-full h-auto bg-background text-white flex flex-wrap items-center justify-between py-4 shadow-md flex-row">
      <Link to="/" className="text-2xl tracking-wide">
        Pokemon Market
      </Link>

      <div className="flex flex-col-reverse md:flex-row items-end justify-end w-full md:w-auto gap-4 mt-4 md:mt-0">
        <div className="flex items-center bg-transparent border border-secondary px-4 h-10 rounded-md w-full md:w-auto">
          <img src={SearchIcon} alt="search icon" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-secondary placeholder-secondary px-4 text-sm w-full"
          />
        </div>

        <button
          onClick={onCartClick}
          className="bg-accent h-10 w-10 rounded-md shadow-md hover:bg-opacity-80 transition flex items-center justify-center"
        >
          <img src={CartIcon} alt="cart icon" className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
