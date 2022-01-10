
import styles from '../styles/categoryBlock.module.scss'
import banner1M from '../assets/banner1M.jpg'
import { useEffect, useState } from 'react'


export default function CategoryBlock() {
   
  return (
   <div className="Shell">
       <div className={styles.Category_block}>
            <div className={styles.Category_header}>
                <h1>Нашите категории</h1>
            </div>
            <div className={styles.Category_images}>
                <div className={styles.Cat_image}>
                    <button><img src={banner1M}/></button>
                    <p>Билки</p>
                </div>
                <div className={styles.Cat_image}>
                    <button><img src={banner1M}/></button>
                </div>
                <div className={styles.Cat_image}>
                    <button><img src={banner1M}/></button>
                </div>
                <div className={styles.Cat_image}>
                    <button><img src={banner1M}/></button>
                </div>
            </div>
       </div>
   </div>
  )
}
