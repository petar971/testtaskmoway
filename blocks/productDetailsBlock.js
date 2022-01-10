import {useRef,useState,useEffect,useContext,useCallback} from 'react'
import styles from '../styles/productDetailBlock.module.scss'
import test from '../assets/test.jpg'
import * as ls from "local-storage";

import { Carousel } from 'react-responsive-carousel';


function ProductDetailBlock({data, notify}) {
    const [openDescription,setOpenDescription] = useState(false)
    const [quantity,setQuantity] = useState(1)
    const [product,setProduct] = useState(data)
    const [price,setPrice] = useState({
        lev:0,
        cents:0,
        promoLev:0,
        promoCent:0
    })
    useEffect(() => {
        setPrice({
            lev:parseInt(product.price),
            cents:(((product.price).toFixed(2) - parseInt(product.price))*100).toFixed(0),
            promoLev:parseInt(product.promo_price),
            promoCent:(((product.promo_price).toFixed(2) - parseInt(product.promo_price))*100).toFixed(0)
        })
    },[])

    const addToCart = () => {
        let product = {...data}
        product.quantity = quantity
        let cart = ls.get('cart')
        if(cart == null){
            ls.set("cart",[])
            cart = ls.get('cart')
        }
        if(cart.filter(pr => pr.id === product.id).length === 0){
            cart.push(product)
        }
        else {
            cart.filter(pr => pr.id === product.id)[0].quantity += product.quantity;
        }
        
        ls.set("cart",cart)
        notify(`Успешно добавихте ${quantity} x ${product.title}`)


        
    }
   return (
            <div className="Shell">
           <div className={styles.Product}>
               <div className={styles.Carousel}>
               <Carousel
                        autoPlay = {false}
                        infiniteLoop = {true}
                        showStatus = {false}
                        showThumbs = {true}
                        showArrows = {false}

                    >  
                    {   product.images.length > 0 ? 
                        product.images.map(img => 
                            <div className={styles.Carousel_image}>
                            <img src={process.env.apiUrl +  img.image} />
                        </div>
                            
                            )
                            :
                            <div className={styles.Carousel_image}>
                            <img src={test} />
                        </div>
                    }
               
                

               
            </Carousel>
            </div>
            <div className={styles.Product_content}>
                <div className={styles.Product_title}>
                    <h2>{product != undefined && product.title}</h2>
                    <p>{product != undefined && product.brand}</p>
                </div>
                <div className={styles.Product_actions}>
                    <div className={styles.Product_price}>
                        {price.promoLev != price.lev || 
                            price.promoCent != price.cents
                        ?
                        <h4>{price.lev}<span>{price.promoCent}</span>лв.</h4> : ""
                        }
                        <h3>{price.promoLev}<span>{price.promoCent}</span>лв.</h3>
                    </div>
                    
                </div>
                <div className={`${openDescription ? styles.Product_open_description : ""} ${styles.Product_description}`}>
                    <h3>Описание:</h3>
                    <p>{product != undefined && product.description}</p>
                </div>
                <div onClick={(e) => setOpenDescription(!openDescription)} className={styles.ViewMore}>{openDescription ? "Скрий":"...Прочети още"}</div>          
                <div className={styles.Products_buttons}>
                        <div className={styles.QuantityButton}>
                            <button onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                            <div>{quantity}</div>
                            <button onClick={(e) => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button onClick={() => addToCart()}>Добави</button>
                    </div>
            </div>
           </div>
           </div>
   )
}

export default ProductDetailBlock;
