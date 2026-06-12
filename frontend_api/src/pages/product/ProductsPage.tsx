/* import Navbar from "../components/Navbar";
import BannerComponent from "../components/Banner"; */

import  { ProductCard } from "../../components/product/ProductCard";
import { FooterLayoutPage } from "../layouts/FooterLayoutPage";
import { ProductSampleData } from "./ProductSampleData";

const Products = () => {

  const handleProductClick = (id: number) => {
    alert(`Product ${id} clicked`);
  };

  return (
    <>
     {/*  <Navbar search={searchParams} setSearch={setSearchParams}/>
      <BannerComponent /> */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {ProductSampleData.map((product) => (
          <ProductCard
            key={product.id}
            id={Number(product.id)}
            title={product.title}
            price={product.price}
            image={product.image}
            description={product.description}
            onProductClick={handleProductClick} 
          />
        ))}
      </div>
      <FooterLayoutPage />
    </>
  );
};

export default Products;

