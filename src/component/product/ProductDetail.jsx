import React, { useState, useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import SideMenu from "../side-menu/SideMenu";

const ProductDetail = () => {
  const [data, setData] = useState();
  const { productId } = useParams();
  const navigateTo = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [cartCount, setCartCount] = useState(localStorage.getItem("cartCount"));

  const showMenu = () => {
    setIsHidden(false);
  };

  const hideSideMenu = () => {
    setIsHidden(true);
  };
  useEffect(() => {
    const getAllProduct = async () => {
      const id = 0;
      if (productId > 20 && productId <= 40) {
        id = productId - 20;
      } else if (productId > 40 && productId <= 60) {
        id = productId - 40;
      } else if (productId > 60 && productId <= 80) {
        id = productId - 60;
      }
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setData(response.data);
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
      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
        <div className="w-[100vw] pl-20">
          <IoArrowBackCircle
            className="text-primary cursor-pointer"
            size={40}
            onClick={() => navigateTo("..")}
          />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                className="max-w-[200px] lg:max-w-xs"
                src={data?.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {data?.title}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                $ {data?.price}
              </div>
              <p className="mb-8">{data?.description}</p>
              <button
                className="bg-primary py-4 px-8 text-white"
                onClick={() => addToCart(data)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <SideMenu isHidden={isHidden} hideSideMenu={hideSideMenu} />
    </>
  );
};

export default ProductDetail;
