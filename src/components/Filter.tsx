import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../assets/icons/arrow-ios-down.png";

interface FilterProps {
  onFilter: (filters: { type: string; rarity: string; set: string }) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [type, setType] = useState<string>("");
  const [rarity, setRarity] = useState<string>("");
  const [set, setSet] = useState<string>("");

  const [isOpen, setIsOpen] = useState({
    type: false,
    rarity: false,
    set: false,
  });

  const types = ["Fire", "Water", "Electric"];
  const rarities = ["Common", "Rare"];
  const sets = ["Base", "Jungle"];

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen({ type: false, rarity: false, set: false });
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: "type" | "rarity" | "set") => {
    setIsOpen({
      type: false,
      rarity: false,
      set: false,
      [name]: !isOpen[name],
    });
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-4" ref={dropdownRef}>
      <div className="relative w-24 sm:w-28">
        <button
          onClick={() => toggleDropdown("type")}
          className="bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md border-2 border-secondary flex items-center justify-between w-full"
        >
          {type || "Type"}
          <img
            src={Dropdown}
            alt="dropdown icon"
            className="w-4 h-4 cursor-pointer"
          />
        </button>
        {isOpen.type && (
          <ul className="absolute bg-background text-white mt-2 rounded-md shadow-md w-full border border-secondary z-10">
            {types.map((t) => (
              <li
                key={t}
                className="px-3 py-1 sm:px-4 sm:py-2 hover:bg-accent cursor-pointer text-sm sm:text-base"
                onClick={() => {
                  setType(t);
                  setIsOpen({ type: false, rarity: false, set: false });
                  onFilter({ type: t, rarity, set });
                }}
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-24 sm:w-28">
        <button
          onClick={() => toggleDropdown("rarity")}
          className="bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md border-2 border-secondary flex items-center justify-between w-full"
        >
          {rarity || "Rarity"}
          <img
            src={Dropdown}
            alt="dropdown icon"
            className="w-4 h-4 cursor-pointer"
          />
        </button>
        {isOpen.rarity && (
          <ul className="absolute bg-background text-white mt-2 rounded-md shadow-md w-full border border-secondary z-10">
            {rarities.map((r) => (
              <li
                key={r}
                className="px-3 py-1 sm:px-4 sm:py-2 hover:bg-accent cursor-pointer text-sm sm:text-base"
                onClick={() => {
                  setRarity(r);
                  setIsOpen({ type: false, rarity: false, set: false });
                  onFilter({ type, rarity: r, set });
                }}
              >
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-24 sm:w-28">
        <button
          onClick={() => toggleDropdown("set")}
          className="bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md border-2 border-secondary flex items-center justify-between w-full"
        >
          {set || "Set"}
          <img
            src={Dropdown}
            alt="dropdown icon"
            className="w-4 h-4 cursor-pointer"
          />
        </button>
        {isOpen.set && (
          <ul className="absolute bg-background text-white mt-2 rounded-md shadow-md w-full border border-secondary z-10">
            {sets.map((s) => (
              <li
                key={s}
                className="px-3 py-1 sm:px-4 sm:py-2 hover:bg-accent cursor-pointer text-sm sm:text-base"
                onClick={() => {
                  setSet(s);
                  setIsOpen({ type: false, rarity: false, set: false });
                  onFilter({ type, rarity, set: s });
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
