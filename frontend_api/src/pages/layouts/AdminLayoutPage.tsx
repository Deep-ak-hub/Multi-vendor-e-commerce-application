import { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { LogoComponent } from "../../components/ui/LogoComponent";
import { FooterLayoutPage } from "./FooterLayoutPage";
import {
  Bars3Icon,
  ChevronDownIcon,
  HomeIcon,
  PhotoIcon,
  SparklesIcon,
  Squares2X2Icon,
  UsersIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayoutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect mobile breakpoint; auto-collapse sidebar on small screens
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", href: "/admin" },
    { icon: PhotoIcon, label: "Banner", href: "/banner" },
    { icon: SparklesIcon, label: "Brand", href: "/brand" },
    { icon: Squares2X2Icon, label: "Category", href: "/category" },
    { icon: UsersIcon, label: "User", href: "/user" },
    { icon: ShoppingBagIcon, label: "Product", href: "/product" },
    { icon: ShoppingBagIcon, label: "Order", href: "/order" },
    { icon: CreditCardIcon, label: "Transaction", href: "/transaction" },
    { icon: ChatBubbleLeftIcon, label: "Chat", href: "/chat" },
  ];

  const accountMenuItems = [
    { label: "Profile", href: "#" },
    { label: "Settings", href: "#" },
    { label: "Billing", href: "#" },
    { label: "Help & Support", href: "#" },
  ];

  const handleNavClick = () => {
    // Close sidebar after nav on mobile
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile backdrop overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gradient-cool text-white
          fixed h-screen left-0 top-0 z-40 w-64
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header row: logo + mobile close btn */}
          <div className="flex items-center justify-between px-4 py-4 md:justify-center md:py-6 border-b border-white/10 shrink-0">
            <LogoComponent className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/10 backdrop-blur-sm" />
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <XMarkIcon className="w-5 h-5 text-white/80" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto md:px-4 md:py-6 md:space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={handleNavClick}
                className="flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
              >
                <item.icon className="w-5 h-5 shrink-0 group-hover:text-primary-400 transition-colors" />
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 shrink-0">
            <p className="text-xs text-white/60 text-center">
              © 2025 Khaajaghar
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`
          flex-1 flex flex-col min-w-0
          transition-all duration-300 ease-in-out
          ${!isMobile && sidebarOpen ? "md:ml-64" : "ml-0"}
        `}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 bg-gradient-secondary border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6">
            {/* Toggle + optional logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-300 cursor-pointer rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              {!sidebarOpen && !isMobile && (
                <div className="w-9 h-9 sm:w-11 sm:h-11">
                  <LogoComponent className="rounded-lg bg-white/10" />
                </div>
              )}
            </div>

            {/* Account dropdown */}
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
                    <p className="text-sm font-semibold text-gray-900">
                      Admin User
                    </p>
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
          </div>
        </header>

        {/* Scrollable content + footer */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="border-t border-gray-200 mt-auto">
            <FooterLayoutPage />
          </footer>
        </div>
      </div>
    </div>
  );
}
