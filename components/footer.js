
import styles from '../styles/footer.module.scss'
import test from '../assets/test.jpg'
import AddCart from './icons/addcart'
import Link from 'next/link'
export default function Footer() {

   return (
    <div className={styles.Footer}>
        <div className="Shell">
        <footer>
            <div>
                <h1>Нашите магазини</h1>
                <p>гр.Бургас жк.Братя Миладинови ул.Шар планина 23 - Магазин "Здравословна бакалия"</p>    
            </div>

            <div>
                <h1>Полезна информация</h1>
                <ul>
                    <li><Link href="/"><a>Общи условия</a></Link></li>
                    <li><Link href="/"><a>За нас</a></Link></li>
                    <li><Link href="/"><a>Карта на сайта</a></Link></li>
                    <li><Link href="/"><a>Политики за поверителност</a></Link></li>
                    <li><Link href="/"><a>Блог с рецепти</a></Link></li>
                    <li><Link href="/"><a>Подаръчни ваучери</a></Link></li>

                </ul>
            </div>
            <div>
                <h1>Контакт</h1>
                <p><a href="mailto:webmaster@example.com">test@test.bg</a></p>
                <p><b>(+359) 899 802 880</b> - пон-пет 9:00 - 18:00</p>
                <p>При проблем със сайта или с поръчките <a href="mailto:webmaster@example.com">test@test.bg</a></p>
            </div>
            <div>
                
            </div>

        </footer>
        </div>
    </div>
  )
}
