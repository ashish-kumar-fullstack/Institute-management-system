import React from "react";
import { AdminSideBar } from "../../constants/sidebar";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Sidebar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  closeSidebar,
}) => {
  return (
    <>
      {/* Mobile dark background overlay */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen bg-gray-100 p-4
          transition-transform duration-300 ease-in-out

          w-64

          ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:sticky md:top-0 md:z-30 md:translate-x-0
          ${isSideBarOpen ? "md:w-64" : "md:w-20"}
        `}
      >
        <div className="flex items-start justify-between">
          {isSideBarOpen && (
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                Its<span className="text-red-500">Manage</span>
              </h1>

              <p className="text-xs text-gray-500">
                Manage your institute with ease
              </p>

              <h2 className="mt-3 text-xl font-bold">Admin</h2>
            </div>
          )}

          {/* Mobile close button */}
          <button
            type="button"
            onClick={closeSidebar}
            className="ml-auto text-3xl md:hidden"
          >
            <IoClose />
          </button>
        </div>

        <hr className="my-4" />

        <nav className="flex flex-col gap-2">
          {AdminSideBar.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    closeSidebar();
                  }
                }}
                title={!isSideBarOpen ? item.name : ""}
                className={({ isActive }) =>
                  `flex items-center rounded-lg py-3 transition-colors ${
                    isSideBarOpen
                      ? "gap-3 px-4"
                      : "justify-center px-2"
                  } ${
                    isActive
                      ? "bg-gray-300 font-bold text-black"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <Icon className="shrink-0 text-xl" />

                {isSideBarOpen && (
                  <span className="whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop collapse button */}
        <button
          type="button"
          onClick={() =>
            setIsSideBarOpen((previous) => !previous)
          }
          className="mt-6 hidden w-full rounded-lg bg-gray-300 px-3 py-2 md:block"
        >
          {isSideBarOpen ? "Collapse" : "Open"}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;