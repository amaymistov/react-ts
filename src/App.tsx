import "./scss/app.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFoundBlock from "./components/NotFound";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";
import React, { Suspense } from "react";
import Loader from "./components/Loader";

const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
