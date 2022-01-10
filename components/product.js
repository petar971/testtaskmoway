
import styles from '../styles/product.module.scss'
import test from '../assets/test.jpg'
import AddCart from './icons/addcart'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import * as ls from "local-storage";

export default function Product({notify,data}) {
    const [price,setPrice] = useState({
        lev:0,
        cents:0,
        promoLev:0,
        promoCent:0
    })
    const router = useRouter()
    const addToCart = () => {
        let product = {...data}
        product.quantity = 1
        let cart = ls.get('cart')
        if(cart == null){
            ls.set("cart",[])
            cart = ls.get('cart')
        }
        if(cart.filter(pr => pr.id === product.id).length === 0){
            cart.push(product)
        }
        else {
            cart.filter(pr => pr.id === product.id)[0].quantity += 1;
        }
        ls.set("cart",cart)
        notify(`Успешно добавихте ${product.title}`)
        console.log(cart);
            
    }

   return (
       <>
       {
           data != undefined ? 
       
    <div className={styles.Product}>
        <div onClick={() =>router.push("/product/" + data.id)} className={styles.Product_image}>
            <img src={data.images.length != 0 ? process.env.apiUrl  + data.images[0].image : test}/>
        </div>
        <div className={styles.Product_content}>
            <div className={styles.Product_text}>
                <h1 onClick={() =>router.push("/product/" + data.id)}>{data.title}</h1>
                <p>{data.promo_price.toFixed(2)}лв.<span>{data.discount != 0 && `${data.price}лв.`}</span></p>
            </div>
            <div onClick={() => addToCart()} className={styles.Product_add_to_cart}>
                <AddCart/>
            </div> 
        </div>
    </div> : ""
}</>
  )
}
