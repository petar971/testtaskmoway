
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchWithToken } from '../../../auth'
import LayoutAdmin from '../../../components/layoutAdmin'
import styles from '../../../styles/adminProducts.module.scss'
import test from '../../../assets/test.jpg'
export default function Orders() {
  const [orders,setOrders] = useState()
  const router = useRouter()
  useEffect(() => {
    fetchWithToken("http://localhost:8000/api/orders")
    .then(res => res.json())
    .then(res => setOrders(res))
    .catch(err => console.log(err))
  },[])
  return (
      <LayoutAdmin>
  <div className={`${styles.Admin_orders} ${"Shell"} ${styles.Admin_products}`}>
    <div className={styles.Add_product}>
      <button onClick={() => router.push('/admin/products/add')}>Добави нов продукт</button>
    </div>
    <div className={styles.Admin_product}>
        <div className={styles.Admin_product_image}>
        <p> <b>ИД</b> </p>

        </div>
        <div className={styles.Admin_product_title}>
          <p><b>Име</b>  </p>
        </div>
        <div className={styles.Admin_product_price}>
          <p><b>Адрес</b></p>
        </div>
        <div className={styles.Admin_product_discount}>
          <p><b>До офис</b> </p>
        </div>
    </div>     
    {
      orders != undefined  ? 
      orders.results.map(pr => 
        <div className={styles.Admin_product}>
            <div className={styles.Admin_product_image}>
            <p>{pr.id}</p>
            </div>
            <div className={styles.Admin_product_title}>
            <p> {pr.name} </p>
            </div>
            <div className={styles.Admin_product_price}>
            <p>{pr.delivery_address}</p>
            </div>
            <div className={styles.Admin_product_discount}>
            <p>{pr.office_delivery ? "Да" : "Не"}</p>
            </div>
        </div>     
        )
    
      :""
    }

     
   
  
  </div>    
      </LayoutAdmin>  
    )
    
}