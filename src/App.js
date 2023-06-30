import { Route, Routes } from "react-router-dom";
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
