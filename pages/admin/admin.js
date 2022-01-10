
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchWithToken } from '../../auth'
import LayoutAdmin from '../../components/layoutAdmin'
import styles from '../../styles/adminProducts.module.scss'
import test from '../../assets/test.jpg'
export default function Admin() {
  const [products,setProducts] = useState()
  const router = useRouter()
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
    .then(res => res.json())
    .then(res => setProducts(res))
    .catch(err => console.log(err))
  },[])
  return (
      <LayoutAdmin>
  <div className={styles.Admin_products}>
    <div className={styles.Add_product}>
      <button onClick={() => router.push('/admin/products/add')}>Добави нов продукт</button>
    </div>
    <div className={styles.Admin_product}>
        <div className={styles.Admin_product_image}>
        <p> <b>Снимка</b> </p>

        </div>
        <div className={styles.Admin_product_title}>
          <p><b>Име</b>  </p>
        </div>
        <div className={styles.Admin_product_price}>
          <p><b>Цена</b></p>
        </div>
        <div className={styles.Admin_product_discount}>
          <p><b>Отстъпка</b> </p>
        </div>
    </div>     
    {
      products != undefined  ? 
      products.results.map(pr => 
        <div className={styles.Admin_product}>
        <div className={styles.Admin_product_image}>
          <img src={pr.images.length != 0 ? "http://localhost:8000" + pr.images[0].image :test}/>
        </div>
        <div className={styles.Admin_product_title}>
          <p> {pr.title} </p>
        </div>
        <div className={styles.Admin_product_price}>
          <p>{pr.price}</p>
        </div>
        <div className={styles.Admin_product_discount}>
          <p>{pr.discount}%</p>
        </div>
    </div>     
        )
    
      :""
    }

     
   
  
  </div>    
      </LayoutAdmin>  
    )
    
}