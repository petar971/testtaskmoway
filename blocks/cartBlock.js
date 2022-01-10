
import styles from '../styles/cart.module.scss'
import banner1M from '../assets/banner1M.jpg'
import test from '../assets/test.jpg'
import { useEffect, useState } from 'react'
import * as ls from "local-storage";
import Cookies from 'js-cookie'
import { fetchWithToken } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import router from 'next/router';


export default function CartBlock() {
    const [openCheckout, setOpenCheckout] = useState(false)
    const [office, setOffice] = useState()
    const [products,setProducts] = useState(ls.get("cart"))
    const [total,setTotal] = useState(0)
    const notify = (text) => toast(text);

    const [userInfo,setUserInfo] = useState({
        "first_name":"",
        "last_name":"",
        "number":"",
        "email":"",
        "city":"",
        "address":"",
        "office":""
    })


    useEffect(() => {
        if(openCheckout){
            document.body.style.overflowY = "hidden"
        }
        else{
            document.body.style.overflowY = "scroll"

        }
    },[openCheckout])

    useEffect(() => {
        let totalPr = 0
        products.map(pr => totalPr += pr.promo_price * pr.quantity)
        setTotal(totalPr);
    },[products])

    const RemoveFromCart = (ids) => {    
        ls.set('cart',products.filter(pr => pr.id !== ids))
        setProducts(ls.get('cart'))
    }

    const FillData = (e) => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value})
    }
    const FinishOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "name": userInfo.first_name + " " + userInfo.last_name,
          "number": userInfo.number,
          "email":userInfo.email,
          "delivery_address": userInfo.city +" "+ userInfo.address,
          'office_delivery':office,
          'products':products
        });

        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                "Content-Type":"application/json"
            },
            redirect: 'follow'
          };
          if(Cookies.get('access')){
            fetchWithToken(process.env.apiUrl + "/api/orders/", requestOptions)
            .then(response => response.json())
            .then(result =>  {
                ls.set("cart",[]);
                setProducts([]);
                setOpenCheckout(false);
                notify("Вашата поръчка е направена успешно")
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            })
            .catch(error => console.log('error', error));
          }
          else {
            fetch(process.env.apiUrl + "/api/orders/", requestOptions)
            .then(response => response.json())
            .then(result => {
                ls.set("cart",[]);
                setProducts([]);
                setOpenCheckout(false);
                notify("Вашата поръчка е направена успешно")
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            })
            .catch(error => console.log('error', error));
          }
          
    }
  return (
   <div className="Shell">
       <div className={styles.Checkout_wrap}>
            <div class="wrap cf">
            <div class="heading cf">
                <h1>Кошница</h1>
                <a href="#" class="continue">Продължи да пазаруваш</a>
            </div>
            <div class="cart">

                <ul class="cartWrap">
                    {
                        products !== undefined && products !== null ? 
                        products.map(pr => 
                            <li class="items odd">
                    
                            <div class="infoWrap"> 
                                <div class="cartSection">
                                <img src={pr.images.length > 0 ? process.env.apiUrl + pr.images[0].image : test} alt="" class="itemImg" />
                                <h3>{pr.title}</h3>
                                
                                <p> <input disabled type="text"  class="qty" placeholder={pr.quantity}/> x {(pr.promo_price).toFixed(2)}лв.</p>
                                
                                <p class="stockStatus">в Наличност</p>  
                                </div>  
                            
                                
                                <div class="prodTotal cartSection">
                                <p>{(pr.quantity * pr.promo_price).toFixed(2)}лв</p>
                                </div>
                                    <div onClick={() => RemoveFromCart(pr.id)} class="cartSection removeWrap">
                                <button href="#" class="remove">x</button>
                                </div>
                            </div>
                            </li>
                            
                            
                            )
                        
                        :""
                    }
          
            

                
                
            
            
                </ul>
            </div>
            
            <div class="promoCode"><label for="promo">Промо код?</label><input type="text" name="promo" placholder="Enter Code" />
            <a href="#" class="btn"></a></div>
            <div class="subtotal cf">
                <ul>
                <li class="totalRow"><span class="label">Межд. сума</span><span class="value">{total.toFixed(2)} лв</span></li>
                    <li class="totalRow"><span class="label">Доставка</span><span class="value">5.00 лв.</span></li>
                        <li class="totalRow final"><span class="label">Тотал</span><span class="value">{(total + 5).toFixed(2)} лв.</span></li>
                <li  class="totalRow"><button onClick={(e) =>{console.log("HI"); setOpenCheckout(true)}} class={styles.Checkout_btn}>Поръчай</button></li>
                </ul>
            </div>
            </div>     
           
       </div>
        <div className={`${openCheckout ? styles.Checkout_open : ""} ${styles.Checkout}`}>
            <div className={styles.Checkout_header}>
                <h1>Поръчка №0000010</h1>
                <button onClick={(e) => setOpenCheckout(false)}className={styles.Close_checkout}></button>    
            </div>        
            <div className={styles.Checkout_form}>
                <label>
                    <p>Име</p>
                    <input onChange={(e) => FillData(e)} name="first_name" type="text"/>
                </label>
                <label>
                    <p>Фамилия</p>
                    <input onChange={(e) => FillData(e)} name="last_name" type="text"/>
                </label>
                <label>
                    <p>Телефонен номер</p>
                    <input onChange={(e) => FillData(e)} name="number" type="text"/>
                </label>
                <label>
                    <p>Имейл</p>
                    <input onChange={(e) => FillData(e)} name="email" type="text"/>
                </label>
                <label>
                        <p>Град</p>
                        <input onChange={(e) => FillData(e)} name="city" type="text"/>
                </label>
                <div className={styles.Office}>
                    <p>Доставка:</p>
                <label>
                        <p>До Офис на Спиди</p>
                        <input name='office' onChange={(e) => {
                            if(e.target.checked)setOffice(true)
                            }} type="radio"/>
                </label>
                <label>
                        <p>До Адрес</p>
                        <input name='office' onChange={(e) => {if(e.target.checked)setOffice(false)}} type="radio"/>
                </label>
                </div>
                {office != undefined ? 
                    office == true ? 
                    <label>
                    <p>Офис на Спиди</p>
                    <textarea name="address" onChange={(e) => FillData(e)} type="text"/>
                </label>
                    :
                    <label>
                    <p>Ваш адрес за доставка</p>
                    <textarea name="address" onChange={(e) => FillData(e)} type="text"/>
                </label>
                    :""
                }
              
               
                <div>
                   
                </div>
                <div className={styles.Finish_order}>
                    <button onClick={(e) => FinishOrder()}>Поръчай</button>
                </div>

            </div>
        </div>
        <div onClick={() => setOpenCheckout(false)} className={openCheckout ? styles.Checkout_blur : ""}></div>
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
  )
}
