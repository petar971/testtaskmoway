
import styles from '../styles/banner.module.scss'

import {MobileOnlyView, BrowserView} from 'react-device-detect'
import banner1D from '../assets/banner1D.jpg'
import banner1M from '../assets/banner1M.jpg'

import { Carousel } from 'react-responsive-carousel';

export default function MainBanner() {

  return (
    <div className={styles.Banner}>
            <Carousel
            autoPlay = {true}
            infiniteLoop = {true}
            showStatus = {false}
            showThumbs = {false}
            showArrows = {false}

         >  
                 <div>
                    <img src={banner1D} />
                    <p className={styles.Label_on_carousel}>Добре Дошли в <br/> Здравословната бакалия</p>
                </div>
                <div>
                    <img src={banner1D} />
                    <p  className={styles.Label_on_carousel}>Добре Дошли в <br/> Здравословната бакалия</p>

                  
                </div>
                <div>
                    <img src={banner1D} />
                    <p  className={styles.Label_on_carousel}>Добре Дошли в <br/> Здравословната бакалия</p>
                   
                </div>

               
            </Carousel>
            

    </div>
  )
}
