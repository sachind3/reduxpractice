import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  mt-4 gap-2 md:gap-3 sm:gap-2">
      {products.map((product) => {
        let discountedPrice =
          product.price - product.price * (product.discountPercentage / 100);
        return (
          <Product key={product.id} product={{ ...product, discountedPrice }} />
        );
      })}
    </div>
  );
};
export default ProductList;
