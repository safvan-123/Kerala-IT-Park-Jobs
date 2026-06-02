

import React, { useEffect, useState } from "react";
import "./css/NavigationBar.css";
import logo from "./assets/kerala_it_park_jobs_.jpeg";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { getUser, logout, getUserId } from "./utils/auth";
import { IoIosNotifications } from "react-icons/io";
import api from "./utils/api";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(getUser());
  const [anchorEl, setAnchorEl] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUser(getUser());
    setImgError(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const userId = getUserId();
      if (!userId) return;
      try {
        const res = await api.get(`/notifications/user/${userId}`);
        const unread = res.data.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      } catch (err) {
        // silently fail
      }
    };

    fetchUnreadCount();
  }, [location.pathname]);

  const role = user?.role;

  const userLogo =
    user?.logo &&
    typeof user.logo === "string" &&
    user.logo.trim() !== "" &&
    !imgError
      ? user.logo
      : null;

  const handleLogout = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "Logout confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      confirmButtonColor: "#0052cc",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: "success",
          title: "Logged out",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderUserAvatar = () => (
    <div className="avatar-container">
      {userLogo ? (
        <img
          src={userLogo}
          alt="user"
          className="user-avatar"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="user-avatar-placeholder">
          <FaUser />
        </div>
      )}
    </div>
  );

  const NotificationIcon = () => (
    <div className="notification-wrapper-icon">
      <IoIosNotifications className="notification-bell" />
      {unreadCount > 0 && (
        <span className="notification-badge">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );

  return (
    <div className="navigation-wrapper">
      <Navbar
        expand="lg"
        className="px-lg-5 px-3 py-3 sticky-top custom-navbar"
        collapseOnSelect
      >
        {/* BRAND LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center brand-logo">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="brand-text d-none d-sm-inline-block">
           Kerala IT Jobs
          </span>
        </Navbar.Brand>

        {/* 📱 MOBILE ICONS */}
        <div className="d-flex align-items-center d-lg-none ms-auto header-mobile-actions">
          {user && (
            <Nav.Link as={Link} to="/notification" className="p-0 me-3 mobile-notif">
              <NotificationIcon />
            </Nav.Link>
          )}
          <div onClick={handleMenuOpen} className="avatar-trigger">
            {renderUserAvatar()}
          </div>
        </div>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="ms-2 custom-toggler"
        />

        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          {/* CENTER LINKS */}
          <Nav className="mx-auto gap-lg-4 text-center text-lg-start mt-3 mt-lg-0 nav-links-container">
            <Nav.Link as={Link} to="/" className={`nav-link-custom ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Nav.Link>
            {role !== "recruiters" && (
              <Nav.Link href="/#jobs-section" className="nav-link-custom">
                Jobs
              </Nav.Link>
            )}
            <Nav.Link href="/companies" className={`nav-link-custom ${location.pathname === "/companies" ? "active" : ""}`}>
              Companies
            </Nav.Link>
            {role !== "recruiters" && (
              <Nav.Link href="/jobPrep" className={`nav-link-custom ${location.pathname === "/jobPrep" ? "active" : ""}`}>
                Job Prep
              </Nav.Link>
            )}
            <Nav.Link href="/contactUs" className={`nav-link-custom ${location.pathname === "/contactUs" ? "active" : ""}`}>
              Contact Us
            </Nav.Link>
          </Nav>

          {/* 💻 DESKTOP ACTIONS */}
          <div className="d-none d-lg-flex align-items-center desktop-actions">
            {user ? (
              <>
                <Nav.Link as={Link} to="/notification" className="me-4 p-0 desktop-notif">
                  <NotificationIcon />
                </Nav.Link>

                <Button
                  className="btn-gradient me-3"
                  onClick={() =>
                    role === "job seekers"
                      ? navigate("/profile")
                      : navigate("/CompanyProfileForm")
                  }
                >
                  COMPLETE PROFILE
                </Button>
              </>
            ) : (
              <div className="d-flex gap-2 me-3">
                <Button variant="outline-primary" className="btn-modern-outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="btn-gradient" onClick={() => navigate("/signUp")}>
                  Sign Up
                </Button>
              </div>
            )}

            <div onClick={handleMenuOpen} className="avatar-trigger">
              {renderUserAvatar()}
            </div>
          </div>

          {/* 📱 MOBILE ACTIONS COLLAPSIBLE */}
          <div className="d-lg-none mt-3 pb-2 mobile-collapse-actions">
            {user ? (
              <Button
                className="w-100 btn-gradient"
                onClick={() => {
                  role === "job seekers" ? navigate("/profile") : navigate("/CompanyProfileForm");
                }}
              >
                COMPLETE PROFILE
              </Button>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Button variant="outline-primary" className="w-100 btn-modern-outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="w-100 btn-gradient" onClick={() => navigate("/signUp")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* USER MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          className: "custom-dropdown-menu"
        }}
      >
        {!user ? [
          <MenuItem key="register" onClick={() => { handleMenuClose(); navigate("/signUp"); }}>Register</MenuItem>,
          <MenuItem key="login" onClick={() => { handleMenuClose(); navigate("/login"); }}>Login</MenuItem>
        ] : [
          <MenuItem key="profile" onClick={() => { handleMenuClose(); role === "job seekers" ? navigate("/manage") : navigate("/manageCompany"); }}>Profile Management</MenuItem>,
          <MenuItem key="settings" onClick={() => { handleMenuClose(); role === "job seekers" ? navigate("/settings") : navigate("/settingsCompany"); }}>Account Settings</MenuItem>,
          <hr key="divider" className="menu-divider" />,
          <MenuItem key="logout" onClick={handleLogout} className="logout-item">Logout</MenuItem>
        ]}
      </Menu>
    </div>
  );
};

export default React.memo(NavigationBar);