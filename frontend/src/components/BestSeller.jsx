import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contextStore/ShopContext";
import ProductsItem from "./ProductsItem";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    setBestSeller(products.filter((item) => item.bestSeller));
  }, [products]);
  return (
    <div className="grid grid-cols-5 gap-3 mx-[10px]">
      {bestSeller.map((item, index) => {
        return (
          <ProductsItem
            key={index}
            id={item._id}
            price={item.price}
            name={item.name}
            image={item.image}
          />
        );
      })}
    </div>
  );
}

export default BestSeller;
