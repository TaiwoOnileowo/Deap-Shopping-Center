"use client"
import React, { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { Product, FooterBanner, HeroBanner } from "../../components";

const Home =  () => {
  // const data = await getData()
  const [data, setData]= useState(null)
  
  useEffect(()=>{
    const fetchData= async() =>{
      try{
        const data = await getData();
        setData(data)
      }catch(error){
      console.error("Error fetching product data:", error)
      }
    }
   
    fetchData()
  },[])
// console.log(data?.props.bannerData)
  return (
    <div className="best-selling-products">
  
      <HeroBanner heroBanner={data?.props.bannerData.length && data?.props.bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Just One Click Away!</p>
         
      </div>

      <div className="products-container">
        {data?.props.products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={data?.props.bannerData &&data?.props.bannerData[1]} />
    </div>
  );
};

async function getData() {
  const query = '*[_type == "product"]';

  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';

  const bannerData = await client.fetch(bannerQuery);
  // console.log(bannerData);
  return {
    props: { products, bannerData },
  };
}

export default Home;
