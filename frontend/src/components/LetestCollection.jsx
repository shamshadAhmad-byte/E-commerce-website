import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contextStore/ShopContext";
import ProductsItem from "./ProductsItem";

function LetestCollection() {
  const { products } = useContext(ShopContext);
  const [latestCollection, setLetestCollection] = useState([]);
  useEffect(() => {
    setLetestCollection(products.slice(0, 10));
  }, [products]);

  return (
    <>
      <div className="grid grid-cols-5 gap-3 mx-[10px]">
        {latestCollection.map((item, index) => {
          return (
            <ProductsItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </>
  );
}

export default LetestCollection;
