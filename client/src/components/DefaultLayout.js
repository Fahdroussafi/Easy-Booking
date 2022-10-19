import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      path: "/easy-booking",
      icon: "ri-home-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/admin",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menutoBeRendered = user?.isAdmin ? adminMenu : userMenu;
  const activeRoute = window.location.pathname;
  return (
    <div className="flex w-full h-[100vh] gap-[20px]">
      <div className="bg-blue-600 rounded-[5px] flex flex-col justify-start px-5 py-0  ">
        <div className="sidebar-header">
          <h1 className="text-white text-[20px] mb-0 p-0 ">Easy-Booking</h1>
          <h1 className="text-white text-[16px] mb-0 p-0 ">
            {user?.name} <br />
            Role :{user?.isAdmin ? "Admin" : "User"}
          </h1>
        </div>
        <div className="flex flex-col gap-5 justify-start mt-[150px] ">
          {menutoBeRendered.map((item, key) => {
            return (
              <div
                key={key}
                className={`${
                  activeRoute === item.path &&
                  "border-l-4 border-white rounded-lg bg-blue-800"
                } " text-[20px] gap-10 mr-[10px] text-white flex items-center hover:bg-blue-800 hover:rounded-lg duration-200 justify-start py-[5px] px-[15px] w-full cursor-pointer transition-[0.2s]"`}
              >
                <i className={item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user_id");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <div className="shadow-lg w-full p-5 hover:shadow-2xl duration-300 ">
          {collapsed ? (
            <i
              className="ri-menu-2-fill cursor-pointer text-[30px]"
              onClick={() => {
                setCollapsed(false);
              }}
            ></i>
          ) : (
            <i
              className="ri-close-line cursor-pointer text-[30px]"
              onClick={() => {
                setCollapsed(true);
              }}
            ></i>
          )}
        </div>
        <div className="p-[10px] px-0">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
