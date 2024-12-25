import React, { useEffect, useState } from "react";
import { assets } from "./admin_assets/assets";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);
  const onClickHandle = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  const location = useLocation();
  useEffect(() => {}, [location]);
  return token ? (
    <div className="flex flex-row gap-2 justify-between mx-10 mt-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-[60px]">
          <div
            onClick={() => navigate("/add")}
            className="flex flex-row gap-10 justify-center border-black border-[2px] rounded-[5px] px-7 py-2 cursor-pointer"
          >
            <span>Add</span>
            <img
              src={assets.add_icon}
              className="size-7 object-cover border-none outline-none"
            />
          </div>
          <div
            onClick={() => navigate("/list")}
            className="flex flex-row gap-10 justify-center border-black border-[2px] rounded-[5px] px-7 py-2 cursor-pointer"
          >
            <span>List</span>
            <img
              src={assets.parcel_icon}
              className="size-7 object-cover border-none outline-none"
            />
          </div>
          <div
            onClick={() => navigate("/order")}
            className="flex flex-row gap-10 justify-center border-black border-[2px] rounded-[5px] px-7 py-2 cursor-pointer"
          >
            <span>Order</span>
            <img
              src={assets.order_icon}
              className="size-7 object-cover border-none outline-none"
            />
          </div>
          <div
            className="flex flex-row gap-10 justify-center border-black border-[2px] rounded-[5px] px-7 py-2 cursor-pointer"
            onClick={onClickHandle}
          >
            Logout
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div
            className={`${
              location.pathname.includes("add")
                ? "border-black border-[3px] px-10 py-10 ml-10 "
                : ""
            }`}
          >
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Login setToken={setToken} token={token} />
  );
}

export default App;
