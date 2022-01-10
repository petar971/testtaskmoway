import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout";

import ProductDetailBlock from "../../blocks/productDetailsBlock";
import RecipesBlock from "../../blocks/RecipesBlock";
import ProductCarouselBlock from "../../blocks/productCarouselBlock";
import bgc from '../../assets/bgc.png'
import { ToastContainer, toast } from 'react-toastify';

export async function getServerSideProps(context) {
  const params = context.params
  const res = await fetch(process.env.apiUrl + '/api/products/' + params.id)
  const data = await res.json();
  return {
    props: {
      data
    },
  };
}

function Product({data}){
  console.log(data);
  const notify = (text) => toast(text);
  return (
    <div>
         <ProductDetailBlock notify={notify} data={data}/>
         <RecipesBlock title={"Рецепти с този продукт"}/>
         
              <ToastContainer
                   position="top-right"
                   autoClose={2000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick
                   rtl={false}
                   pauseOnFocusLoss
                   draggable
                   pauseOnHover
                    />
      </div>
  );
}

export default Product;
