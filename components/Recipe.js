
import styles from '../styles/recipe.module.scss'
import test from '../assets/borov.jpg'
import AddCart from './icons/addcart'
export default function Recipe() {

   return (
    <div className={styles.Recipe}>
        <div className={styles.Recipe_image}>
            <img src={test}/>
        </div>
        <div className={styles.Product_content}>
            <div className={styles.Product_text}>
                <h1>Масло от сибирски кедър, студено пресовано 100 мл.</h1>
                <p>Lorem ipsum dolor sit ame consetur adipisicing elit. Voluptate, consetur adipisicing elit.Lorem ipsum dolor.</p>
            </div>
         
        </div>
    </div>
  )
}
