import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((e) => {
        console.log("Error While User Logout : ", e);
      });
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
