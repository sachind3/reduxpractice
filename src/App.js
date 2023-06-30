import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  CartPage,
  CategoryProductPage,
  ProductDetailPage,
  SearchPage,
} from "./pages";
const Header = lazy(() => import("./components/Header"));
const SideBar = lazy(() => import("./components/SideBar"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={`product/:id`} element={<ProductDetailPage />} />
        <Route path={`category/:category`} element={<CategoryProductPage />} />
        <Route path={`cart`} element={<CartPage />} />
        <Route path={`search/:searchTerm`} element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
