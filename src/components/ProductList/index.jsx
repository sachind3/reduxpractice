import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-5 mt-4 gap-4">
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
