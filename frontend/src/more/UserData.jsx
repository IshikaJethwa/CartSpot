import React, { useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupportIcon from '@mui/icons-material/Support';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import HeartActiveIcon from "@material-ui/icons/Favorite";
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';

const UserData = ({ user }) => {

  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const [open, setOpen] = useState(false);
  const history = useHistory();
  
  const scroolEffect = useRef(null);

  window.addEventListener("scroll", () =>{
    if(window.pageYOffset > 100){
        document.querySelector(".speedDial").classList.add("active");
    }
    else{
      document.querySelector(".speedDial").classList.remove("active");
    }
  })

  const dispatch = useDispatch();

  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
        style={{
          color: cartItems.length === 0 ? "" : "tomato",
           }}
        />
      ),
     
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    {
      icon:
          <FavoriteBorderIcon
          style={{
            color: favouriteItems.length === 0 ? "" : "tomato",
           }}
          />,
      name:
      `Favourite (${favouriteItems.length})`,
      func: favourite,
    },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <SupportIcon />, name: "Report us", func: report },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user.role === "Creator") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/dashboard");
  }
  function home() {
    history.push("/");
  }
  function orders() {
    history.push("/orders");
  }
  function cart() {
    history.push("/cart");
  }
  function favourite() {
    history.push("/favourites");
  }
  function account() {
    history.push("/me");
  }

  function report() {
    history.push("/support");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        useRef={scroolEffect}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : ("/profile.png")}
            alt="Profile"
            style={{
              position:"fixed"
            }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        ))}
      </SpeedDial>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </>
  );
};

export default UserData;