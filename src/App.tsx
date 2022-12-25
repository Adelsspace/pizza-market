import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import "./scss/app.scss";

import Home from "./pages/Home";

import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/* webpackChunkNme: Cart*/ "./pages/Cart")
);
const FullItem = React.lazy(
  () => import(/* webpackChunkNme: FullItem*/ "./pages/FullItem")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkNme: NotFound*/ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>загрузка карточки товара...</div>}>
              <FullItem />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
