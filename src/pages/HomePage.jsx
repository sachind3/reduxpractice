import HomeSlider from "../components/HomeSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../store/categorySlice";
import {
  fetchProducts,
  getAllProducts,
  getAllProductStatus,
} from "../store/productSlice";
import Heading from "../components/ui/Heading";
import { STATUS } from "../utils";
import { useEffect } from "react";
import Loader from "../components/ui/Loader";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  useEffect(() => {
    dispatch(fetchProducts(50));
  }, [dispatch]);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductStatus);

  const tempProducts = [];
  if (products?.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);
      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  let catProductOne = products.filter(
    (product) => product.category === categories[0]
  );
  let catProductTwo = products.filter(
    (product) => product.category === categories[1]
  );
  let catProductThree = products.filter(
    (product) => product.category === categories[2]
  );
  let catProductFour = products.filter(
    (product) => product.category === categories[3]
  );
  return (
    <section>
      <div className="container mx-auto px-4">
        <HomeSlider />
      </div>
      <div className="container mx-auto px-4 py-4">
        <Heading title={"See our products"} />
        {productStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={tempProducts} />
        )}
      </div>
      <div className="container mx-auto px-4 py-4">
        <Heading title={categories[0]} />
        {productStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={catProductOne} />
        )}
      </div>
      <div className="container mx-auto px-4 py-4">
        <Heading title={categories[1]} />
        {productStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={catProductTwo} />
        )}
      </div>
      <div className="container mx-auto px-4 py-4">
        <Heading title={categories[2]} />
        {productStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={catProductThree} />
        )}
      </div>
      <div className="container mx-auto px-4 py-4">
        <Heading title={categories[3]} />
        {productStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={catProductThree} />
        )}
      </div>
      <div className="container mx-auto px-4 py-4">
        <Heading title={categories[4]} />
        {productStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={catProductFour} />
        )}
      </div>
    </section>
  );
};
export default HomePage;
