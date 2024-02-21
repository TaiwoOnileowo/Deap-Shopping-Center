"use client";
import React from "react";
import Link from "next/link";
import { urlForImage } from "../sanity/lib/image";
import Image from "next/image";
const Product = ({ product: { image, name, slug, price } }) => {
  const handleClickProduct = () => {
    localStorage.setItem("selectedProductImage", JSON.stringify(image));
  };
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlForImage(image && image[0])}
            width={250}
            height={250}
            className="product-image"
            onClick={handleClickProduct}
            alt="Best Selling Product"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
