"use client";
import React, { useEffect, useState } from "react";
import { urlForImage } from "../../../../sanity/lib/image";
import { client } from "../../../../sanity/lib/client";
import { useStateContext } from "../../../../context/StateContext";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../../../components";
import Image from "next/image";
const ProductDetails = (params) => {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  const { decQty, incQty, qty, onAdd, setShowCart, cartImage, setCartImage } =
    useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductData(params);
        setProducts(data.products);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [params]);
  useEffect(() => {
    const savedSelectedProductImage = JSON.parse(
      localStorage.getItem("selectedProductImage")
    );
    setSelectedProductImage(savedSelectedProductImage);
  }, []);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };
  const filteredProducts = products.filter((p) => p._id !== product._id);

  return (
    <div>
      <div className="product-detail-container">
        {selectedProductImage && (
          <div>
            <div className="product-detail-image-div">
              <Image
                src={urlForImage(selectedProductImage[index])}
                className="product-detail-image"
                alt={product?.name}
                width={400}
                height={400}
              />
            </div>
            <div className="small-images-container">
              {selectedProductImage?.map((item, i) => (
                <div className="small-image-container" key={item.key}>
                  <Image
                    src={urlForImage(item)}
                    className={
                      i === index ? "small-image selected-image" : "small-image"
                    }
                    width={80}
                    height={80}
                    alt="Other Image"
                    onMouseEnter={() => {
                      setIndex(i);
                      setCartImage(selectedProductImage[i]);
                      localStorage.setItem(
                        "cartImage",
                        JSON.stringify(cartImage)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="product-detail-desc">
          <h1>{product?.name}</h1>
          <div className="reviews">
            <div className="star">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <p className="star-no">(20)</p>
            </div>
            <h4>Details: </h4>
            <p>{product?.details}</p>
            <p className="price">${product?.price}</p>
            <div className="quantity">
              <h3>Quantity: </h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons">
              <button
                className="add-to-cart"
                type="button"
                onClick={() => onAdd(product, qty)}
              >
                Add To Cart
              </button>
              <button className="buy-now" type="button" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {filteredProducts?.map((item) => (
              <Product key={item?._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type =="product"]{
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
async function getProductData({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    products,
    product,
  };
}

export default ProductDetails;
