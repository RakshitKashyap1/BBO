/**
 * @file PublicLayout.jsx
 * @description The layout used for all public-facing pages (Home, Search, Details, Login).
 * It includes a sticky NavBar and a Footer, with a dynamic content area in the middle.
 */

import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Monitor, LogOut, Menu, X } from "lucide-react";
import Footer from "../components/common/Footer";

/**
 * PublicLayout:
 * Provides the consistent header (nav) and footer across the public site.
 */
export default function PublicLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  /**
   * handleLogout: Clears the auth session and redirects the user to the home page.
   */
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  /**
   * dashboardLink: Logic to determine where the 'Dashboard' link should point
   * based on the currently logged-in user's role.
   */
  const dashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "advertiser") return "/advertiser/dashboard";
    if (user.role === "owner") return "/owner/dashboard";
    if (user.role === "admin") return "/admin/dashboard";
    return "/";
  };

  return (
    <div className="flex-col min-h-screen">
      {/* Global Navigation Bar */}
      <nav className="navbar">
        <div className="container navbar-container">
          {/* Brand Logo & Name */}
          <Link to="/" className="navbar-brand">
            <Monitor size={28} className="text-primary" />
            BBO.
          </Link>

          {/* Hamburger Menu Toggle (Mobile only) */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Links */}
          <div className={`navbar-links ${isMenuOpen ? "mobile-open" : ""}`}>
            <Link to="/search" className="navbar-link" onClick={closeMenu}>
              Explore Ad Spaces
            </Link>

            {/* Conditional Rendering based on Authentication state */}
            {user ? (
              <>
                <Link
                  to={dashboardLink()}
                  className="navbar-link"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary nav-btn"
                  style={{ padding: "0.5rem 1rem" }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary nav-btn"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 
                Main Content Area 
                <Outlet /> renders the specific page component (e.g., Home, Search) 
                defined in the router.
            */}
      <main className="flex-1 w-full pt-20" style={{ paddingBottom: "4rem" }}>
        <Outlet />
      </main>

      {/* Persistent Global Footer */}
      <Footer />
    </div>
  );
}
