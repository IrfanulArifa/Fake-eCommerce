import "./App.css";
import Login from "./component/login/Login";
import Homepage from "./component/home/Homepage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductDetail from "./component/product/ProductDetail";
import { useState, useEffect } from "react";
import ProtectedRoot from "./component/protected-root/ProtectedRoot";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  const [isAllowed, setIsAllowed] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      children: [
        {
          index: true,
          element: (
            <ProtectedRoot isAllowed={isAllowed}>
              <Homepage />
            </ProtectedRoot>
          )
        },
        {
          path: "product/:productId",
          element: (
            <ProtectedRoot isAllowed={isAllowed}>
              <ProductDetail />
            </ProtectedRoot>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    if (isLogin) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    const intervalId = setInterval(() => {
      const newIsLogin = localStorage.getItem("isLogin");
      if (newIsLogin) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isLogin]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
