
import styles from '../styles/header.module.scss'
import Link from 'next/link'
import { useEffect } from 'react'
export default function HeaderAdmin() {
  

   return (
    <div className={styles.Header_admin}>
      <Link href="/admin/orders/orders"><a>Поръчки</a></Link>
      <Link href="/admin/admin"><a>Продукти</a></Link>
    </div>
  )
}
