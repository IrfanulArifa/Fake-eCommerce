import React, { useEffect } from "react";
import { BsPlus, BsEyeFill, BsBag } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import Paging from "../paging/Paging";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import SideMenu from "../side-menu/SideMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [paging, setPaging] = useState([]);
  const [cartCount, setCartCount] = useState(localStorage.getItem("cartCount"));

  const [isHidden, setIsHidden] = useState(true);
  const showMenu = () => {
    setIsHidden(false);
  };

  const hideSideMenu = () => {
    setIsHidden(true);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
  };

  const changeIndexPaging = (idx) => {
    setIndex(idx);
    console.log("Indexnya = ", (index - 1) * 8, index * 8);
  };

  useEffect(() => {
    // toast("Berhasil Login");
    const getAllProduct = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const originalProduct = response.data;

        setPaging(Array.from({ length: 10 }));
        const duplicatedProducts = [];
        for (let i = 0; i < 4; i++) {
          duplicatedProducts.push(...originalProduct);
        }

        const modifiedProducts = duplicatedProducts.map((products, index) => ({
          ...products,
          id: index + 1,
        }));
        setData(modifiedProducts);
      } catch (e) {
        console.error("Error Fetching Data: ", e);
      }
    };
    getAllProduct();
  }, []);

  const getTotalCartItem = () => {
    const existingData = localStorage.getItem("cartData");
    let totalItem = 0;
    if (existingData) {
      const dataArray = JSON.parse(existingData);
      totalItem = dataArray.length;
    }
    return totalItem + 1;
  };

  const addToCart = (data) => {
    const existingData = localStorage.getItem("cartData");
    if (existingData) {
      const dataArray = JSON.parse(existingData);
      const existingItemIndex = dataArray.findIndex(
        (item) => item.id === data.id
      );
      if (existingItemIndex !== -1) {
        dataArray[existingItemIndex].count += 1;
      } else {
        data.count = 1;
        dataArray.push(data);
      }

      const dataCount = getTotalCartItem();
      setCartCount(getTotalCartItem);
      const newItem = data;
      dataArray.push(newItem);
      localStorage.setItem("cartCount", dataCount);
      localStorage.setItem("cartData", JSON.stringify(dataArray));
    } else {
      const newArray = [data];
      data.count = 1;
      setCartCount(1);
      localStorage.setItem("cartCount", 1);
      localStorage.setItem("cartData", JSON.stringify(newArray));
    }
  };

  return (
    <>
      <Header showSideMenu={showMenu} getTotalItem={cartCount} />
      <div className="w-[100vw]">
        <section
          className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20"
          id="section2"
        >
          <div className="container mx-auto flex justify-around h-full">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center uppercase">
                <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
              </div>
              <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
                Fresh Fashion Finds
                <br />
                <span className="font-light text-lg">new collection</span>
              </h1>
              <a
                className="self-start uppercase font-semibold border-b-2 border-primary text-2xl cursor-pointer"
                onClick={scrollToNextSection}
              >
                Discover More
              </a>
            </div>
          </div>
        </section>
        <section id="products" className="pt-[8rem]">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">
              Explore Our Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
              {data.slice((index - 1) * 8, index * 8).map((value, idx) => (
                <div className="p-4" key={idx}>
                  <div className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition rounded-lg">
                    <div className="aspect-w-1 aspect-h-1 flex justify-center items-center p-[1rem]">
                      <div className="w-[200px] h-[200px] flex justify-center items-center px-3">
                        <img
                          className="object-cover max-w-full max-h-full group-hover:scale-110 transition duration-300 rounded-lg"
                          src={value.image}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="absolute top-1 -right-11 group-hover:right-2 flex flex-row justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        style={{ background: "transparent", boxShadow: "none" }}
                        className="border-none p-0"
                      >
                        <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500 rounded-full">
                          <BsPlus
                            className="text-3xl"
                            onClick={() => addToCart(value)}
                          />
                        </div>
                      </button>
                      <Link to={`/home/product/${value.id}`}>
                        <div className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full">
                          <BsEyeFill />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm capitalize text-black mb-1">
                      {value.category}
                    </div>
                    <div>
                      <h2 className="font-semibold mb-1">{value.title}</h2>
                    </div>
                    <h2 className="font-semibold">$ {value.price}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
        </section>
      </div>
      <Paging
        pagingLength={paging}
        pagingClickHandler={paging}
        changeIdx={changeIndexPaging}
      />
      <SideMenu isHidden={isHidden} hideSideMenu={hideSideMenu} />
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Homepage;
