import { useParams } from "react-router-dom";
import {
  clearSearch,
  fetchSearchProducts,
  getSearchProducts,
  getSearchProductsStatus,
} from "../store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Heading from "../components/ui/Heading";
import ProductList from "../components/ProductList";
import { STATUS } from "../utils";
import Loader from "../components/ui/Loader";
const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);
  useEffect(() => {
    if (searchTerm) {
      dispatch(clearSearch(clearSearch()));
      dispatch(fetchSearchProducts(searchTerm));
    }
  }, [searchTerm, dispatch]);
  if (searchProducts?.length === 0) {
    return (
      <section className="py-4">
        <div className="container mx-auto px-4">
          <Heading title={`No product found: ${searchTerm}`} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <Heading title={searchTerm} />
        {searchProductsStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={searchProducts} />
        )}
      </div>
    </section>
  );
};
export default SearchPage;
