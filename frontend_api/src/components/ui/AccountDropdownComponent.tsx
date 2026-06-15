import { ChevronDownIcon } from "flowbite-react";
import { useRef, useState } from "react";

export default function AccountDropdownComponent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accountMenuItems = [
    { label: "Profile", href: "#" },
    { label: "Settings", href: "#" },
    { label: "Billing", href: "#" },
    { label: "Help & Support", href: "#" },
  ];

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-300 cursor-pointer rounded-lg transition-colors"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-xs sm:text-sm shrink-0">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">admin@ecommerce.com</p>
          </div>
          <ChevronDownIcon
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500 truncate">
                admin@ecommerce.com
              </p>
              <p className="text-xs text-primary-600 font-medium mt-1">
                Super Admin
              </p>
            </div>
            {accountMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
