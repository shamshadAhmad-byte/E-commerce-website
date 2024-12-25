import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contextStore/ShopContext";
import RelatedProductDisplay from "./RelatedProductDisplay";

function RealtedProduct({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const applyRelated = () => {
    let relatedCopyProduct = products.filter(
      (item) => item.category === category && item.subCategory === subCategory
    );
    setRelatedProducts(relatedCopyProduct.slice(0, 4));
  };
  useEffect(() => {
    applyRelated();
  }, []);
  return (
    <div className="flex flex-row justify-center">
      {relatedProducts.map((item, index) => {
        return (
          <RelatedProductDisplay
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        );
      })}
    </div>
  );
}

export default RealtedProduct;
