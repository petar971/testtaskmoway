
import styles from '../styles/categoryBlock.module.scss'
import banner1M from '../assets/banner1M.jpg'
import Product from '../components/product'
import { useEffect,useState } from 'react'
export default function ProductBlock({title}) {
    const [products,setProducts] = useState()
    useEffect(() => {
        fetch(process.env.apiUrl + "/api/products")
        .then(res => res.json())
        .then(res => setProducts(res.results))
      },[])
  return (
   <div className="Shell">
       <div className={styles.ProductBlock}>
            <div className={styles.Category_header}>
                <h1>{title}</h1>
            </div>
            <div className={styles.Products}>
                {
                    products != undefined && products.map(pr => 
                        <div className={styles.Product_wrap}>
                        <Product data={pr}/>
                    </div>
                        )
                }
             
            
                
                    


            </div>
       </div>
   </div>
  )
}
