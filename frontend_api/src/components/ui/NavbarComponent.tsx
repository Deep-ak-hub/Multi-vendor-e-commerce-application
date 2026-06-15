import React from "react";
import {
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { LogoComponent } from "./LogoComponent";
import { Link } from "react-router";
import AccountDropdownComponent from "./AccountDropdownComponent";

type NavBarProps = {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ search, setSearch }: NavBarProps) {
  const [open, setOpen] = React.useState(false);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <nav className="bg-gradient-accent border-b border-gray-200">
      <div className=" mx-auto px-4 sm:px-8 lg:px-14">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="-ml-2 mr-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Open menu"
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            <Link to="/">
              <LogoComponent className="size-14" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-12 flex-1 mx-16">
            <div className="relative w-full max-w-xl">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search products, categories..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Collections
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Deals
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </div>

            <button className="relative p-2 rounded-md text-gray-600 hover:scale-110 cursor-pointer ">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <AccountDropdownComponent />
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 pt-4 pb-3 space-y-3">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
              />
            </div>

            <a
              href="#"
              className="block text-gray-700 px-2 py-2 rounded-md hover:bg-gray-50"
            >
              Collections
            </a>
            <a
              href="#"
              className="block text-gray-700 px-2 py-2 rounded-md hover:bg-gray-50"
            >
              Deals
            </a>
            <a
              href="#"
              className="block text-gray-700 px-2 py-2 rounded-md hover:bg-gray-50"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
