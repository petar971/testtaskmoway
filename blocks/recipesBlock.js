
import styles from '../styles/categoryBlock.module.scss'
import Recipe from '../components/Recipe'
import dynamic from 'next/dynamic';
import {slidesToShowPlugin} from "@brainhubeu/react-carousel"
const Carousel = dynamic(
() => import ('@brainhubeu/react-carousel'),
{
ssr: false
}
)


export default function RecipesBlock({title}) {

  return (
   <div className="Shell">
       <div className={styles.ProductBlock}>
            <div className={styles.Category_header}>
                <h1>{title}</h1>
            </div>
            <div className={styles.Recipes}>
       
                    <Carousel
                    
                    plugins={['arrows',"infinite",
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                         numberOfSlides: 4,
                        },
                      },
                      
                ]}
                breakpoints={{
                    640: {
                      plugins: [
                       {
                         resolve: slidesToShowPlugin,
                         options: {
                          numberOfSlides: 1.5
                         }
                       },
                     ]
                    },
                    900: {
                      plugins: [
                       {
                         resolve: slidesToShowPlugin,
                         options: {
                          numberOfSlides: 2
                         }
                       },
                     ]
                    },
                    1024: {
                        plugins: [
                         {
                           resolve: slidesToShowPlugin,
                           options: {
                            numberOfSlides: 3
                           }
                         },
                       ]
                      },
                  }}
                    >
                    <Recipe/>
                    <Recipe/>
                    <Recipe/>
                    <Recipe/>
                    <Recipe/>
                    <Recipe/>
                    <Recipe/>

                    <Recipe/>
                    <Recipe/>
                </Carousel>
               
             

            </div>
       </div>
   </div>
  )
}
