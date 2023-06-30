import { Route, Routes, useLocation } from "react-router-dom";
import {
  HomePage,
  CartPage,
  CategoryProductPage,
  ProductDetailPage,
  SearchPage,
} from "./pages";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import { useEffect } from "react";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

const App = () => {
  return (
    <ScrollToTop>
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
    </ScrollToTop>
  );
};
export default App;
