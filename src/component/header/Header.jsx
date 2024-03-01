import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { BsBag } from "react-icons/bs";

const Header = ({ showSideMenu, getTotalItem }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cartCount, setCartCount] = useState(getTotalItem);
  const headerHeight = 66;

  const headerStyle = {
    position: "fixed",
    top: 0,
    zIndex: 10,
    backgroundColor: scrollPosition > headerHeight ? "#ffffff" : "transparent",
  };

  const logout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <header
        className={"bg-white py-4 w-full z-10 lg:px-8 transition-all"}
        style={headerStyle}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div>
            <div className="w-[40px]">
              <h1
                style={{ fontFamily: '"Satisfy", cursive', fontSize: "1.5rem" }}
              >
                Fakecommerce
              </h1>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="cursor-pointer flex relative">
              <BsBag className="text-2xl" onClick={() => showSideMenu()} />
              <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {localStorage.getItem("cartCount")}
              </div>
            </div>
            <div
              className="cursor-pointer flex relative"
              onClick={() => logout()}
            >
              <CiLogout className="text-3xl" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
