import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchProductOfCategory,
  getAllCategoryProducts,
  getAllcategoryProductsStatus,
} from "../store/categorySlice";
import Loader from "../components/ui/Loader";
import Heading from "../components/ui/Heading";

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    if (category) {
      dispatch(fetchProductOfCategory(category));
    }
  }, [dispatch, category]);
  const categoryProductsStatus = useSelector(getAllcategoryProductsStatus);
  const categoryProducts = useSelector(getAllCategoryProducts);

  console.log(categoryProducts);
  if (categoryProductsStatus) {
    return <Loader />;
  }
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <Heading title={category.replace("-", " ").toUpperCase()} />
        <ProductList products={categoryProducts} />
      </div>
    </section>
  );
};
export default CategoryProductPage;
