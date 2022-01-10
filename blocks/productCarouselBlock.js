
import styles from '../styles/categoryBlock.module.scss'
import Product from '../components/product'
import dynamic from 'next/dynamic';
import {slidesToShowPlugin} from "@brainhubeu/react-carousel"
import { useEffect, useState } from 'react';
const Carousel = dynamic(
() => import ('@brainhubeu/react-carousel'),
{
ssr: false
}
)


export default function ProductCarouselBlock({title}) {
  const [products,setProducts] = useState()

  useEffect(() => {
    fetch(process.env.apiUrl  + "/api/products")
    .then(res => res.json())
    .then(res => setProducts(res.results))
  },[])
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
                         numberOfSlides: 5,
                        },
                      },
                      
                ]}
                breakpoints={{
                    640: {
                      plugins: [
                       {
                         resolve: slidesToShowPlugin,
                         options: {
                          numberOfSlides: 1.7
                         }
                       },
                     ]
                    },
                    900: {
                      plugins: [
                       {
                         resolve: slidesToShowPlugin,
                         options: {
                          numberOfSlides: 3
                         }
                       },
                     ]
                    },
                    1024: {
                        plugins: [
                         {
                           resolve: slidesToShowPlugin,
                           options: {
                            numberOfSlides: 5
                           }
                         },
                       ]
                      },
                  }}
                    >
                      {
                        products != undefined &&
                        products.map(pr => 
                          <div className={styles.Product_car_wrap}>
                          <Product data={pr}/>
                        </div>
                          )
                      }
                    
                   
                </Carousel>
               
             

            </div>
       </div>
   </div>
  )
}
