import React, { useEffect, useRef, useState } from "react";
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideMenu = ({ isHidden, hideSideMenu }) => {
  const [rightPosition, setRightPosition] = useState(0);
  const [products, setProducts] = useState([]);
  const contentRef = useRef(null);
  const [cartCount, setCartCount] = useState(localStorage.getItem("cartCount"));

  useEffect(() => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth;
      setRightPosition(-contentWidth);
    }
  }, []);

  const getCartData = () => {
    const localStorageData = localStorage.getItem("cartData");
    if (localStorageData) {
      setProducts(JSON.parse(localStorageData));
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const totalPrice = () => {
    let data = localStorage.getItem("cartData");
    let totalPrice = 0;
    if (data) {
      data = JSON.parse(data);
      totalPrice = data.reduce((total, product) => total + product.price, 0);
    }

    return totalPrice;
  };

  const filterDataByMaxCount = (data) => {
    const filteredData = data.reduce((acc, currentItem) => {
      const existingItem = acc.find((item) => item.id === currentItem.id);
      if (!existingItem) {
        acc.push({ ...currentItem });
      } else {
        if (currentItem.count > existingItem.count) {
          acc = acc.filter((item) => item.id !== currentItem.id);
          acc.push({ ...currentItem });
        }
      }
      return acc;
    }, []);

    return filteredData;
  };

  const decreaseCount = (productId) => {
    const existingData = localStorage.getItem("cartData");
    if (existingData) {
      let dataArray = JSON.parse(existingData);
      const productIndex = dataArray.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        dataArray[productIndex].count--;
        if (dataArray[productIndex].count === 0) {
          dataArray.splice(productIndex, 1);
        }
        localStorage.setItem("cartData", JSON.stringify(dataArray));
      }
    }
  };

  const removeItemsById = (productId) => {
    const existingData = localStorage.getItem("cartData");
    if (existingData) {
      let dataArray = JSON.parse(existingData);
      dataArray = dataArray.filter((product) => product.id !== productId);
      localStorage.setItem("cartData", JSON.stringify(dataArray));
    }
  };

  const filteredProducts = filterDataByMaxCount(products);

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
    console.log("Keklik");
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

  const checkout = () => {
    toast(`Checkout berhasil dilakukan dengan total harga $ ${totalPrice()}`);
    localStorage.removeItem("cartData");
    localStorage.removeItem("cartCount");
  };

  const deleteCart = () => {
    localStorage.removeItem("cartData");
    localStorage.removeItem("cartCount");
  };

  return (
    <>
      <div
        className={
          "right-[-400px] w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"
        }
        style={{ right: isHidden ? rightPosition : 0, zIndex: 11 }}
        ref={contentRef}
      >
        <div className="flex items-center justify-between py-6 border-b">
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
            <IoMdArrowForward
              className="text-2xl"
              onClick={() => hideSideMenu()}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
          {filteredProducts.map((value, idx) => (
            <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
              <div className="w-full min-h-[150px] flex items-center gap-x-4">
                <div>
                  <img className="max-w-[80px]" src={value.image} alt="" />
                </div>
                <div className="w-full flex flex-col">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
                      {value.title}
                    </div>
                    <div className="text-xl cursor-pointer">
                      <IoMdClose
                        className="text-gray-500 hover:text-red-500 transition"
                        onClick={() => removeItemsById(value.id)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-2 h-[36px] text-sm">
                    <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
                      <div className="h-full flex-1 flex justify-center items-center cursor-pointer">
                        <IoMdRemove onClick={() => decreaseCount(value.id)} />
                      </div>
                      <div className="h-full flex justify-center items-center px-2">
                        {value.count}
                      </div>
                      <div className="h-full flex flex-1 justify-center items-center cursor-pointer">
                        <IoMdAdd onClick={() => addToCart(value)} />
                      </div>
                    </div>
                    {/* item price */}
                    <div className="flex flex-1 justify-around items-center">
                      {`$ ${parseFloat(value.count * value.price).toFixed(2)}`}
                    </div>
                    {/* final price */}
                    <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(
                      value.count * value.price
                    ).toFixed(2)}`}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-y-3  mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="font-semibold">
              <span className="mr-2">Subtotal:</span>
              {`$ ${parseFloat(totalPrice()).toFixed(2)}`}
            </div>
            <div
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
              onClick={() => deleteCart()}
            >
              <FiTrash2 />
            </div>
          </div>
          <button
            className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
            onClick={() => checkout()}
          >
            Checkout
          </button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default SideMenu;
